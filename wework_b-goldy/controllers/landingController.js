
const moment = require("moment");
let Landing = require("../modal/landing"),
    dataTypes = require("../services/dataTypes/mongodb"),
    uploadImage = require("../services/fileUpload/upload");

exports.imageUpload = async (req) => {
    try {
        let imagePath = null;
        if (req.files) {
            const uploadResult = await uploadImage.uploadImage(req.files?.image, "landing");
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
        let records = await Landing.aggregate([{
            $match: query
        },
        {
            $project: {
                title: 1
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
        let records = await Landing.aggregate([{
            $match: query
        }
        ])
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

exports.getDataByTitle = async (req) => {
    try {
        if (!req.query?.title)
            throw "Title is required!"
        let title = req?.query?.title.split("-").join(" ");
        let data = await Landing.aggregate([
            {
                $match: {
                    title: { $regex: new RegExp(title, 'i') },
                    isDeleted: false,
                    isActive: true
                }
            },
            {
                $lookup: {
                    from: "forms",
                    pipeline: [{ $match: { isDeleted: false, isActive: true } }, { $project: { heading: 1, field: 1 } }],
                    localField: "section.formId",
                    foreignField: "_id",
                    "as": "form"
                }
            },
            {
                $lookup: {
                    from: "clientales",
                    pipeline: [{ $match: { isDeleted: false, isActive: true } }, { $project: { title: 1, image: 1 } }],
                    localField: "clientale",
                    foreignField: "_id",
                    "as": "clientale"
                }
            },
            {
                $lookup: {
                    from: "testies",
                    pipeline: [{ $match: { type: "image", isDeleted: false, isActive: true } }, { $limit: 8 }, { $project: { name: 1, image: 1, desc: 1, rating: 1, desig: 1 } }],
                    localField: "testi",
                    foreignField: "_id",
                    "as": "testi"
                }
            }
        ]
        );
        if (data.length > 0) {
            return {
                data: data[0],
                error: null,
                message: "SUCCESS",
                statusCode: 200
            }
        } else {
            return {
                data: null,
                error: 'Page not found',
                message: "SUCCESS",
                statusCode: 404
            }
        }
    } catch (error) {
        console.log('Error inside get city by title function in cityController', error);
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
        let dataExits = await Landing.findOne({
            title: req.body.title,
            isDeleted: false
        });
        if (dataExits) {
            return {
                data: null,
                error: "Landing Page with this name already exist!",
                message: "FAILED",
                statusCode: 208
            }
        }
        var user = new Landing(req.body)
        let saveUser = await user.save();
        return {
            data: saveUser,
            error: null,
            message: "Landing Page Added successfully.",
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
        if (!req?.body?.landingId)
            throw "Landing Id is required!";
        let data = req.body;
        if (data?.section?.length) {
            let checkBanner = data?.section.findIndex(x => x.type == "banner");
            if (checkBanner != -1) {
                data.section[checkBanner].formId = dataTypes?.ObjectId(data?.section[checkBanner]?.formId);
            }
        }
        var updatedData = {
            ...data,
            updatedAt: Date.now()
        }
        // console.log('updating data', updatedData);
        await Landing.updateOne({ _id: dataTypes.ObjectId(req.body.landingId) }, updatedData);
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
        if (!req?.body?.landingId)
            throw "Landing Id is required!";
        let res = await Landing.updateOne({ _id: dataTypes.ObjectId(req.body.landingId) }, { isDeleted: true });
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