
let Testi = require("../modal/testimonial"),
    dataTypes = require("../services/dataTypes/mongodb"),
    argon2 = require("argon2"),
    uploadImage = require("../services/fileUpload/upload"),
    moment = require("moment"),
    sendingMail = require("../services/mail/mail");
// let mailer = require("./authController");

exports.getData = async (req) => {
    try {
        const records = await Testi.aggregate([
            {
                $match: { isDeleted: false },
            },
            {
                $sort: { date: -1 }
            },
        ]);
        // // console.log(records);
        // records.forEach(item => {
        //     item.updatedAt = moment(item?.updatedAt).fromNow();
        // })
        return {
            data: records,
            error: null,
            message: "SUCCESS",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside getDealer function in TestiController ', error);
        return {
            data: null,
            error: error,
            message: "FAILED",
            statusCode: 500
        }
    }
}

exports.getDataDrop = async (req) => {
    try {
        const records = await Testi.aggregate([
            {
                $match: { isDeleted: false, isActive: true, type: "image" },
            },
            {
                $sort: { date: -1 }
            },
            {
                $project: {
                    name: 1,
                    rating: 1
                }
            }
        ]);
        // // console.log(records);
        records.forEach(item => {
            item.name = item?.name + ` (${item?.rating})`;
        })
        return {
            data: records,
            error: null,
            message: "SUCCESS",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside getDealer function in TestiController ', error);
        return {
            data: null,
            error: error,
            message: "FAILED",
            statusCode: 500
        }
    }
}

exports.getDataByPlace = async (req) => {
    try {
        let { placeTo, type } = req?.body;
        let query = { isDeleted: false, isActive: true };
        if (placeTo)
            query = { ...query, placeTo: { $in: [placeTo] } };
        if (type)
            query = { ...query, type };
        const records = await Testi.aggregate([
            {
                $match: query,
            },
            {
                $sort: { date: -1 }
            },
            {
                $project: {
                    name: 1,
                    image: 1,
                    video: 1,
                    desc: 1,
                    date: 1,
                    rating: 1,
                    desig: 1
                }
            }
        ]);
        return {
            data: records,
            error: null,
            message: "SUCCESS",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside getDealer function in TestiController ', error);
        return {
            data: null,
            error: error,
            message: "FAILED",
            statusCode: 500
        }
    }
}

exports.getDataByUser = async (req) => {
    try {
        const records = await Testi.aggregate([
            {
                $match: { isDeleted: false },
            },
            {
                $sort: { date: -1 }
            }
        ]);
        // console.log(records);
        let imageTesti = [], videoTesti = [];
        records.forEach(item => {
            item.updatedAt = moment(item?.updatedAt).fromNow();
            if (item?.type == 'image')
                imageTesti.push(item);
            else
                videoTesti.push(item);
        })
        return {
            data: { imageTesti, videoTesti },
            error: null,
            message: "SUCCESS",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside getDealer function in TestiController ', error);
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
            const uploadResult = await uploadImage.uploadImage(req.files?.image, 'Testi');
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

exports.getTestiById = async (req) => {
    try {
        let userRecord = await Testi.aggregate(
            [{
                $match: {
                    _id: {
                        $eq: dataTypes.ObjectId(req.body.testiId)
                    },
                },
            }
            ]
        );
        if (userRecord.length > 0) {
            return {
                data: userRecord[0],
                error: null,
                message: "SUCCESS",
                statusCode: 200
            }
        } else {
            return {
                data: null,
                error: 'Testi not found',
                message: "SUCCESS",
                statusCode: 404
            }
        }
    } catch (error) {
        console.log('Error inside getTestiById function in TestiController', error);
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
        let TestiExits = await Testi.findOne({
            name: req.body.name,
            isDeleted: false
        });
        if (TestiExits) {
            return {
                data: null,
                error: "Testi already Exist!",
                message: "FAILED",
                statusCode: 208
            }
        }
        var TestiToSave = new Testi(req.body)
        let saveTesti = await TestiToSave.save();
        return {
            data: saveTesti,
            error: null,
            message: "Testi added successfully.",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside addTesti function in TestiController ', error);
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
        console.log('id to update', req.body.testiId, req.body);
        let data = req.body;
        var updatedData = {
            ...data,
            updatedAt: Date.now()
        }
        // console.log('updating data', updatedData);
        let updateTesti = await Testi.updateOne({ _id: dataTypes.ObjectId(req.body.testiId) }, updatedData);
        return {
            data: updateTesti,
            error: null,
            message: "SUCCESS",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside updateTesti function in TestiController ', error);
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
        let res = await Testi.updateOne({ _id: dataTypes.ObjectId(req.body.testiId) }, { isDeleted: true });
        return {
            data: res,
            error: null,
            message: "SUCCESS",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside removeTesti function in TestiController ', error);
        return {
            data: null,
            error: error,
            message: "FAILED",
            statusCode: 500
        }
    }
}

exports.banTesti = async (req) => {
    try {
        let updateTesti = await Testi.updateOne({ _id: dataTypes.ObjectId(req.body.testiId) }, { TestiStatus: req.body.TestiStatus })
        return {
            data: updateTesti,
            error: null,
            message: "SUCCESS",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside banTesti function in TestiController ', error);
        return {
            data: null,
            error: error,
            message: "FAILED",
            statusCode: 500
        }
    }
}