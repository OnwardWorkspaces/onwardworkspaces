
const moment = require("moment");
let Location = require("../modal/locations"),
    dataTypes = require("./../services/dataTypes/mongodb"),
    uploadImage = require("../services/fileUpload/upload");

exports.getDataAdmin = async (req) => {
    try {
        let query = { isDeleted: false };
        let records = await Location.aggregate([{
            $match: query
        },
        {
            $lookup: {
                from: "cities",
                pipeline: [{ $project: { title: 1 } }],
                localField: "cityId",
                foreignField: "_id",
                "as": "city"
            }
        },
        {
            $unwind: "$city"
        },
        {
            $project: {
                title: 1,
                heading: 1,
                city: "$city.title",
                path: 1,
                isActive: 1,
                cityId: 1,
                desc: 1,
                image: 1,
                gallery: 1,
                seo: 1,
                FAQ: 1,
                isFAQ: 1,
                isClient: 1,
                clientale: 1,
                formId: 1,
                cliHead: 1,
                cliPara: 1,
                proHead: 1,
                proPara: 1,
                galHead: 1,
                galPara: 1,
                locHead: 1,
                locPara: 1,
                testiHead: 1,
                testiPara: 1,
                faqHead: 1,
                faqPara: 1
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
        let records = await Location.aggregate([{
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

exports.getDrop = async (req) => {
    try {
        let query = { isDeleted: false, isActive: true };
        let records = await Location.aggregate([{
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
            const uploadResult = await uploadImage.uploadImage(req.files?.image, 'locations');
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
        if (!req.query?.path)
            throw "Path is required!"
        let data = await Location.aggregate([
            {
                $match: {
                    path: req?.query?.path,
                    isDeleted: false,
                    isActive: true
                }
            },
            {
                $lookup: {
                    from: "cities",
                    pipeline: [{ $project: { title: 1, path: 1 } }],
                    localField: "cityId",
                    foreignField: "_id",
                    "as": "city"
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
                    from: "locations",
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
                    }, { $limit: 12 }, { $project: { title: 1, image: 1, path: 1 } }],
                    "as": "nearBy"
                }
            },
            {
                $lookup: {
                    from: "properties",
                    pipeline: [{ $match: { isDeleted: false, isActive: true } }, { $limit: 8 },
                    {
                        $lookup: {
                            from: "cities",
                            pipeline: [{ $project: { path: 1 } }],
                            localField: "cityId",
                            foreignField: "_id",
                            as: "city"
                        }
                    },
                    {
                        $lookup: {
                            from: "locations",
                            pipeline: [{ $project: { path: 1 } }],
                            localField: "locationId",
                            foreignField: "_id",
                            as: "location"
                        }
                    },
                    { $project: { title: 1, images: 1, seat: 1, path: 1., location: 1, city: 1 } }],
                    localField: "_id",
                    foreignField: "locationId",
                    "as": "property"
                }
            },
            {
                $lookup: {
                    from: "testies",
                    pipeline: [{ $match: { type: "image", isDeleted: false, isActive: true } }, { $limit: 8 }, { $project: { name: 1, image: 1, desc: 1, rating: 1, desig: 1 } }],
                    localField: "_id",
                    foreignField: "locationId",
                    "as": "testi"
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
            },
            {
                $lookup: {
                    from: "categories",
                    pipeline: [{ $match: { isDeleted: false, isActive: true, title: "Coworking" } }, { $project: { title: 1, why: 1 } }],
                    "as": "category"
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
                error: 'Area not found',
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
        let dataExits = await Location.findOne({
            title: req.body.title,
            isDeleted: false
        });
        if (dataExits) {
            return {
                data: null,
                error: "Location with this name already Exist!",
                message: "FAILED",
                statusCode: 208
            }
        }
        var user = new Location(req.body)
        let saveUser = await user.save();
        return {
            data: saveUser,
            error: null,
            message: "Location Added successfully.",
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
        await Location.updateOne({ _id: dataTypes.ObjectId(req.body.locationId) }, updatedData);
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
        if (!req?.body?.locationId)
            throw "location Id is required!"
        let res = await Location.updateOne({ _id: dataTypes.ObjectId(req.body.locationId) }, { isDeleted: true });
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