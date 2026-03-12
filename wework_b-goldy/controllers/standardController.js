
const moment = require("moment");
let Cate = require("../modal/standard_cat"),
    Service = require("../modal/standard_service"),
    dataTypes = require("./../services/dataTypes/mongodb"),
    uploadImage = require("../services/fileUpload/upload");

exports.getDataAdmin = async (req) => {
    try {
        let query = { isDeleted: false };
        let records = await Service.aggregate([{
            $match: query
        },
        {
            $lookup: {
                from: "standcats",
                pipeline: [{ $project: { title: 1 } }],
                localField: "catId",
                foreignField: "_id",
                "as": "category"
            }
        },
        {
            $unwind: "$category"
        },
        {
            $project: {
                title: 1,
                category: "$category.title",
                isActive: 1,
                image: 1
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

exports.imageUpload = async (req) => {
    try {
        let imagePath = null;
        if (req.files) {
            const uploadResult = await uploadImage.uploadImage(req.files?.image, "standard");
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

exports.getUserById = async (req) => {
    try {
        let user = await User.aggregate(
            [{
                $match: {
                    _id: {
                        $eq: dataTypes.ObjectId(req.body.user_id)
                    },
                },
            }
            ]
        );
        if (user.length > 0) {
            delete user[0].password;
            delete user[0].otp;
            return {
                user: user[0],
                error: null,
                message: "SUCCESS",
                statusCode: 200
            }
        } else {
            return {
                user: null,
                error: 'User not found',
                message: "SUCCESS",
                statusCode: 404
            }
        }
    } catch (error) {
        console.log('Error inside getUserById function in userController', error);
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
        let dataExits = await Service.findOne({
            title: req.body.title,
            isDeleted: false
        });
        if (dataExits) {
            return {
                data: null,
                error: "Service with this name already Exist!",
                message: "FAILED",
                statusCode: 208
            }
        }
        var user = new Service(req.body)
        let saveUser = await user.save();
        return {
            data: saveUser,
            error: null,
            message: "Service Added successfully.",
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
        let data = req.body;
        var updatedData = {
            ...data,
            updatedAt: Date.now()
        }
        // console.log('updating data', updatedData);
        await Service.updateOne({ _id: dataTypes.ObjectId(req.body.serviceId) }, updatedData);
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
        if (!req?.body?.serviceId)
            throw "service Id is required!";
        let res = await Service.updateOne({ _id: dataTypes.ObjectId(req.body.serviceId) }, { isDeleted: true });
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

exports.getCatData = async (req) => {
    try {
        let query = { isDeleted: false, isActive: true };
        let records = await Cate.aggregate([{
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

exports.getCatDataAdmin = async (req) => {
    try {
        let query = { isDeleted: false };
        let records = await Cate.aggregate([{
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

exports.addCatData = async (req) => {
    try {
        let dataExits = await Cate.findOne({
            title: req.body.title,
            isDeleted: false
        });
        if (dataExits) {
            return {
                data: null,
                error: "Category with this name already Exist!",
                message: "FAILED",
                statusCode: 208
            }
        }
        var user = new Cate(req.body)
        let saveUser = await user.save();
        return {
            data: saveUser,
            error: null,
            message: "Category Added successfully.",
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

exports.updateCatData = async (req) => {
    try {
        // console.log('id to update', req.body.user_id, req.body);
        let data = req.body;
        var updatedData = {
            ...data,
            updatedAt: Date.now()
        }
        // console.log('updating data', updatedData);
        await Cate.updateOne({ _id: dataTypes.ObjectId(req.body.catId) }, updatedData);
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

exports.removeCatData = async (req) => {
    try {
        if (!req?.body?.catId)
            throw "Category Id is required!";
        let res = await Cate.updateOne({ _id: dataTypes.ObjectId(req.body.catId) }, { isDeleted: true });
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