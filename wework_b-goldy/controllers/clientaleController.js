
const moment = require("moment");
let Clientale = require("../modal/clientale"),
    dataTypes = require("../services/dataTypes/mongodb"),
    uploadImage = require("../services/fileUpload/upload");

exports.imageUpload = async (req) => {
    try {
        let imagePath = null;
        if (req.files) {
            const uploadResult = await uploadImage.uploadImage(req.files?.image, "clientale");
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

exports.getData = async (req) => {
    try {
        let query = { isDeleted: false, isActive: true };
        let records = await Clientale.aggregate([{
            $match: query
        },
        {
            $project: {
                isDeleted: 0,
                createdAt: 0
            }
        }])
        return {
            data: records,
            error: null,
            message: "SUCCESS",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside get user list function in userController ', error);
        return {
            data: null,
            error: error,
            message: "FAILED",
            statusCode: 500
        }
    }
}

exports.getDataAdmin = async (req) => {
    try {
        let query = { isDeleted: false };
        let records = await Clientale.aggregate([{
            $match: query
        },
        {
            $lookup: {
                from: "locations",
                pipeline: [{ $project: { title: 1 } }],
                localField: "_id",
                foreignField: "cityId",
                "as": "locations"
            }
        },
        {
            $project: {
                isDeleted: 0,
                createdAt: 0
            }
        }])
        return {
            data: records,
            error: null,
            message: "SUCCESS",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside get user list function in userController ', error);
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
        let dataExits = await Clientale.findOne({
            title: req.body.title,
            isDeleted: false
        });
        if (dataExits) {
            return {
                data: null,
                error: "Clientale with this name already Exist!",
                message: "FAILED",
                statusCode: 208
            }
        }
        var user = new Clientale(req.body)
        let saveUser = await user.save();
        return {
            data: saveUser,
            error: null,
            message: "Clientale Added successfully.",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside addUser function in userController ', error);
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
        // console.log('id to update', req.body.user_id, req.body);
        if (!req?.body?.clientId)
            throw "Clientale Id is required!";
        let data = req.body;
        var updatedData = {
            ...data,
            updatedAt: Date.now()
        }
        // console.log('updating data', updatedData);
        await Clientale.updateOne({ _id: dataTypes.ObjectId(req.body.clientId) }, updatedData);
        return {
            data: "Success",
            error: null,
            message: "SUCCESS",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside updateUser function in userController ', error);
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
        if (!req?.body?.clientId)
            throw "Clientale Id is required!";
        let res = await Clientale.updateOne({ _id: dataTypes.ObjectId(req.body.clientId) }, { isDeleted: true });
        return {
            data: "Success",
            error: null,
            message: "SUCCESS",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside removeUser function in userController ', error);
        return {
            data: null,
            error: error,
            message: "FAILED",
            statusCode: 500
        }
    }
}