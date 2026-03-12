
const moment = require("moment");
let User = require("../modal/user"),
    dataTypes = require("./../services/dataTypes/mongodb"),
    argon2 = require("argon2"),
    Enquiry = require("../modal/contact"),
    Subscriber = require("../modal/subscribes"),
    Booking = require("../modal/booking"),
    uploadImage = require("../services/profilePicture/upload"),
    sendingMail = require("./../services/mail/mail");
// let mailer = require("./authController");

exports.getUsers = async (req) => {
    try {
        let { type } = req.query;
        let query = { isActive: true, isDeleted: false };
        let records = [];
        if (type == 'enquiry')
            records = await Enquiry.aggregate([
                {
                    $match: query,
                }
            ]);
        else if (type == 'subscriber')
            records = await Subscriber.aggregate([
                {
                    $match: query,
                }
            ]);
        else if (type == 'booking')
            records = await Booking.aggregate([
                {
                    $match: query,
                },
                {
                    $lookup: {
                        from: "tours",
                        pipeline: [{ $project: { _id: 1, name: 1 } }],
                        localField: "tourId",
                        foreignField: "_id",
                        as: "tour"
                    }
                },
            ]);
        // console.log(records);
        records.forEach(item => {
            item.createdAt = moment(item?.createdAt).fromNow();
        })
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

exports.getAdmins = async (req) => {
    try {
        const records = await User.aggregate([
            {
                $match: { isDeleted: false, role: "Sub" },
            }
        ]);
        // console.log(records);
        records.forEach(item => {
            item.createdAt = moment(item?.createdAt).fromNow();
            item.lastActive = moment(item?.lastActive).fromNow();
            delete item?.password;
            delete item?.otp;
        });
        return {
            data: records,
            error: null,
            message: "SUCCESS",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside getDealer function in userController ', error);
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
            const uploadResult = await uploadImage.uploadThumb(req.files?.thumb);
            console.log('response from bucket', uploadResult);
            if (uploadResult && uploadResult?.statusCode == 200) {
                imagePath = uploadResult?.path;
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
                        $eq: dataTypes.ObjectId(req.body.userId)
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

exports.addUser = async (req) => {
    try {
        let userExits = await User.findOne({
            email: req.body.email,
            isDeleted: false
        });
        if (userExits) {
            return {
                data: null,
                error: "User already exist with this email!",
                message: "FAILED",
                statusCode: 208
            }
        }
        let mailData = {
            name: req.body.name,
            email: req.body.email,
            password: req?.body?.password,
            subject: 'Invitation from Onward Workspace',
            type: 'invite'
        }
        const mailResult = sendingMail.sendMail(mailData);
        const passwordHashed = await argon2.hash(req.body.password);
        req.body.password = passwordHashed;
        var user = new User(req.body)
        let saveUser = await user.save();
        return {
            data: {
                name: saveUser?.name,
                email: saveUser?.email
            },
            error: null,
            message: "User Invited successfully.",
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

exports.updateUser = async (req) => {
    try {
        console.log('id to update', req.body.userId, req.body);
        let data = req.body;
        if (data?.password) {
            const passwordHashed = await argon2.hash(data.password);
            data.password = passwordHashed;
        }
        var updatedData = {
            ...data,
            updatedAt: Date.now()
        }
        // console.log('updating data', updatedData);
        let updateUser = await User.updateOne({ _id: dataTypes.ObjectId(req.body.userId) }, updatedData);
        return {
            data: updateUser,
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

exports.removeUser = async (req) => {
    try {
        let res = undefined;
        if (req?.body?.enquiryId)
            res = await Enquiry.updateOne({ _id: dataTypes.ObjectId(req.body.enquiryId) }, { isDeleted: true });
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

exports.banUser = async (req) => {
    try {
        let updateUser = await User.updateOne({ _id: dataTypes.ObjectId(req.body.userId) }, { userStatus: req.body.userStatus })
        return {
            data: updateUser,
            error: null,
            message: "SUCCESS",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside banUser function in userController ', error);
        return {
            data: null,
            error: error,
            message: "FAILED",
            statusCode: 500
        }
    }
}