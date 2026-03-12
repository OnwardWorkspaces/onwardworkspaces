
let Destination = require("../modal/destination"),
    dataTypes = require("../services/dataTypes/mongodb"),
    argon2 = require("argon2"),
    uploadImage = require("../services/fileUpload/upload"),
    moment = require("moment"),
    sendingMail = require("../services/mail/mail");
// let mailer = require("./authController");

exports.getData = async (req) => {
    try {
        const records = await Destination.aggregate([
            {
                $match: { isDeleted: false },
            }
        ]);
        // console.log(records);
        records.forEach(item => {
            // item.updatedAt = moment(item?.updatedAt).fromNow();
            delete item?.updatedAt;
            delete item?.createdAt;
            delete item?.isDeleted;
            item.tag.sort(function (a, b) { return a.pos - b.pos });
        })
        return {
            data: records,
            error: null,
            message: "SUCCESS",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside getDealer function in DestinationController ', error);
        return {
            data: null,
            error: error,
            message: "FAILED",
            statusCode: 500
        }
    }
}

exports.imageUpload = async (req) => {
    try {
        let imagePath = null;
        if (req.files) {
            const uploadResult = await uploadImage.uploadImage(req.files?.image, 'Destination');
            console.log('response from bucket', uploadResult);
            if (uploadResult && uploadResult?.statusCode == 200) {
                imagePath = uploadResult?.url;
                return {
                    data: imagePath,
                    error: null,
                    message: "SUCCESS",
                    statusCode: 200
                }
            }
        } else {
            return {
                data: null,
                error: "Image file is required!",
                message: "FAILED",
                statusCode: 400
            }
        }
    } catch (error) {
        return {
            data: null,
            error: error,
            message: "FAILED",
            statusCode: 500
        }
    }
}

exports.getDetailById = async (req) => {
    try {
        let destiId = undefined;
        // console.log('id from query', req)
        if (req.query?.destinationId?.length == 4) {
            let allDesti = await Destination.aggregate([{ $match: { isActive: true, isDeleted: false } }]);
            allDesti.forEach(item => {
                let id = String(item?._id);
                if (id.slice(id.length - 4, id?.length) == req.query?.destinationId)
                    destiId = item?._id;
            })
        } else {
            destiId = req.query.destinationId
        }
        let userRecord = await Destination.aggregate(
            [{
                $match: {
                    _id: {
                        $eq: dataTypes.ObjectId(destiId)
                    },
                },
            }
            ]
        );
        if (userRecord.length > 0) {
            userRecord[0]?.tag.sort(function (a, b) { return a.pos - b.pos });
            return {
                data: userRecord[0],
                error: null,
                message: "SUCCESS",
                statusCode: 200
            }
        } else {
            return {
                data: null,
                error: 'Destination not found',
                message: "SUCCESS",
                statusCode: 404
            }
        }
    } catch (error) {
        console.log('Error inside getDestinationById function in DestinationController', error);
        return {
            data: null,
            error: error,
            message: "FAILED",
            statusCode: 500
        }
    }
}

exports.addData = async (req) => {
    try {
        var DestinationToSave = new Destination(req.body)
        let saveDestination = await DestinationToSave.save();
        return {
            data: saveDestination,
            error: null,
            message: "Destination added successfully.",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside addDestination function in DestinationController ', error);
        return {
            data: null,
            error: error,
            message: "FAILED",
            statusCode: 500
        }
    }
}

exports.updateData = async (req) => {
    try {
        console.log('id to update', req.body.destinationId, req.body);
        let data = req.body;
        var updatedData = {
            ...data,
            updatedAt: Date.now()
        }
        // console.log('updating data', updatedData);
        let updateDestination = await Destination.updateOne({ _id: dataTypes.ObjectId(req.body.destinationId) }, updatedData);
        return {
            data: updateDestination,
            error: null,
            message: "SUCCESS",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside updateDestination function in DestinationController ', error);
        return {
            data: null,
            error: error,
            message: "FAILED",
            statusCode: 500
        }
    }
}

exports.removeData = async (req) => {
    try {
        let res = await Destination.updateOne({ _id: dataTypes.ObjectId(req.body.destinationId) }, { isDeleted: true });
        return {
            data: res,
            error: null,
            message: "SUCCESS",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside removeDestination function in DestinationController ', error);
        return {
            data: null,
            error: error,
            message: "FAILED",
            statusCode: 500
        }
    }
}

exports.banDestination = async (req) => {
    try {
        let updateDestination = await Destination.updateOne({ _id: dataTypes.ObjectId(req.body.destinationId) }, { DestinationStatus: req.body.DestinationStatus })
        return {
            data: updateDestination,
            error: null,
            message: "SUCCESS",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside banDestination function in DestinationController ', error);
        return {
            data: null,
            error: error,
            message: "FAILED",
            statusCode: 500
        }
    }
}