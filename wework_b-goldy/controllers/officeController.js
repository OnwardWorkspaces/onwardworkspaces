
const moment = require("moment");
let Office = require("../modal/offices"),
    dataTypes = require("./../services/dataTypes/mongodb"),
    uploadImage = require("../services/fileUpload/upload");

exports.getDataAdmin = async (req) => {
    try {
        let query = { isDeleted: false };
        let records = await Office.aggregate([{
            $match: query
        },
        {
            $lookup: {
                from: "categories",
                pipeline: [{ $project: { title: 1 } }],
                localField: "catId",
                foreignField: "_id",
                "as": "category"
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

exports.getData = async (req) => {
    try {
        let query = { isDeleted: false, isActive: true };
        let records = await Office.aggregate([{
            $match: query
        },
        {
            $lookup: {
                from: "locations",
                pipeline: [{ $project: { title: 1 } }],
                localField: "_id",
                foreignField: "officeId",
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

exports.getDrop = async (req) => {
    try {
        let query = { isDeleted: false, isActive: true };
        let records = await Office.aggregate([{
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

exports.imageUpload = async (req) => {
    try {
        let imagePath = null;
        if (req.files) {
            const uploadResult = await uploadImage.uploadImage(req.files?.image, 'offices');
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

exports.getDataByTitle = async (req) => {
    try {
        if (!req.query?.title)
            throw "Title is required!";
        let userRecord = await Office.aggregate(
            [{
                $match: {
                    path: req?.query?.title,
                    isDeleted: false,
                    isActive: true
                }
            },
            {
                $lookup: {
                    from: "offices",
                    let: { cityId: "$cityId", currentLocationId: "$_id" },
                    pipeline: [{
                        $match: {
                            isDeleted: false,
                            isActive: true,
                            $expr: {
                                $and: [
                                    { $eq: ["$cityId", "$$cityId"] },
                                    { $ne: ["$_id", "$$currentLocationId"] }, // Exclude the current location
                                ],
                            },
                        },
                    }, { $limit: 12 },
                    {
                        $lookup: {
                            from: "categories",
                            pipeline: [{ $project: { title: 1, why: 1 } }],
                            localField: "catId",
                            foreignField: "_id",
                            "as": "category"
                        }
                    },
                    { $project: { title: 1, image: 1, category: 1, path: 1 } }],
                    "as": "suggest"
                }
            },
            {
                $lookup: {
                    from: "testies",
                    pipeline: [{ $match: { type: "image" } }, { $limit: 8 }, { $project: { name: 1, image: 1, desc: 1, rating: 1, desig: 1 } }],
                    localField: "_id",
                    foreignField: "officeId",
                    "as": "testi"
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
                    from: "forms",
                    pipeline: [{ $match: { isDeleted: false, isActive: true } }, { $project: { heading: 1, desc: 1, field: 1, image: 1 } }],
                    localField: "formId",
                    foreignField: "_id",
                    "as": "form"
                }
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
                error: 'Office not found',
                message: "SUCCESS",
                statusCode: 404
            }
        }
    } catch (error) {
        console.log('Error inside getPropertyById function in PropertyController', error);
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
        let dataExits = await Office.findOne({
            path: req.body.path,
            isDeleted: false
        });
        if (dataExits) {
            return {
                data: null,
                error: "Office with this url already Exist!",
                message: "FAILED",
                statusCode: 208
            }
        }
        var user = new Office(req.body)
        let saveUser = await user.save();
        return {
            data: saveUser,
            error: null,
            message: "Office Added successfully.",
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
        await Office.updateOne({ _id: dataTypes.ObjectId(req.body.officeId) }, updatedData);
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
        if (!req?.body?.officeId)
            throw "Office Id is required!";
        let res = await Office.updateOne({ _id: dataTypes.ObjectId(req.body.officeId) }, { isDeleted: true });
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

exports.banUser = async (req) => {
    try {
        let updateUser = await User.updateOne({ _id: dataTypes.ObjectId(req.body.user_id) }, { userStatus: req.body.userStatus })
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