
const moment = require("moment");
let Subs = require("../modal/subscribes"),
    dataTypes = require("./../services/dataTypes/mongodb"),
    uploadImage = require("../services/fileUpload/upload");

exports.getDataAdmin = async (req) => {
    try {
        let query = { isDeleted: false };
        let records = await Subs.aggregate([{
            $match: query
        },
        {
            $sort: { createdAt: -1 }
        },
        {
            $project: {
                email: 1,
                createdAt: 1
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
        let found = await Subs.countDocuments({ email: req?.body?.email, isDeleted: false, isActive: true });
        if (found)
            throw "Already Subscribed!";
        var user = new Subs(req.body)
        let saveUser = await user.save();
        return {
            data: saveUser,
            error: null,
            message: "Subscribed.",
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
        await Subs.updateOne({ _id: dataTypes.ObjectId(req.body.subsId) }, updatedData);
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
        if (!req?.body?.subsId)
            throw "Subs Id is required!"
        let res = await Subs.updateOne({ _id: dataTypes.ObjectId(req.body.subsId) }, { isDeleted: true });
        return {
            data: res,
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