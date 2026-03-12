
const moment = require("moment");
let City = require("../modal/cities"),
    dataTypes = require("./../services/dataTypes/mongodb"),
    uploadImage = require("../services/fileUpload/upload");

exports.getDataAdmin = async (req) => {
    try {
        let query = { isDeleted: false };
        let records = await City.aggregate([{
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

exports.getData = async (req) => {
    try {
        let query = { isDeleted: false, isActive: true };
        let records = await City.aggregate([{
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

exports.getDrop = async (req) => {
    try {
        let query = { isDeleted: false, isActive: true };
        let records = await City.aggregate([{
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
            const uploadResult = await uploadImage.uploadImage(req.files?.image, 'cities');
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

exports.getCityByTitle = async (req) => {
    try {
        let data = await City.aggregate([
            {
                $match: {
                    path: req?.query?.path,
                    isDeleted: false,
                    isActive: true
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
                    from: "amenities",
                    pipeline: [{ $match: { isDeleted: false, isActive: true } }, { $project: { title: 1, image: 1 } }],
                    localField: "ameni",
                    foreignField: "_id",
                    as: "ameni"
                }
            },
            {
                $lookup: {
                    from: "locations",
                    pipeline: [{ $match: { isDeleted: false, isActive: true } }, { $limit: 8 }, { $project: { title: 1, image: 1, path: 1 } }],
                    localField: "_id",
                    foreignField: "cityId",
                    "as": "location"
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
                    { $project: { title: 1, images: 1, seat: 1, path: 1, city: 1, location: 1 } }],
                    localField: "_id",
                    foreignField: "cityId",
                    "as": "property"
                }
            },
            {
                $lookup: {
                    from: "offices",
                    pipeline: [{ $match: { isDeleted: false, isActive: true } }, { $limit: 8 },
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
                    localField: "_id",
                    foreignField: "cityId",
                    "as": "offices"
                }
            },
            {
                $lookup: {
                    from: "testies",
                    pipeline: [{ $match: { type: "image", isDeleted: false, isActive: true } }, { $limit: 8 }, { $project: { name: 1, image: 1, desc: 1, rating: 1, desig: 1 } }],
                    localField: "_id",
                    foreignField: "cityId",
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
                    pipeline: [{ $match: { isDeleted: false, isActive: true, isCowork: true } }, { $project: { title: 1, why: 1 } }],
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
                error: 'City not found',
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
        let dataExits = await City.findOne({
            title: req.body.title,
            isDeleted: false
        });
        if (dataExits) {
            return {
                data: null,
                error: "City with this name already exist!",
                message: "FAILED",
                statusCode: 208
            }
        }
        var user = new City(req.body)
        let saveUser = await user.save();
        return {
            data: saveUser,
            error: null,
            message: "City Added successfully.",
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
        await City.updateOne({ _id: dataTypes.ObjectId(req.body.cityId) }, updatedData, { returnOriginal: false });
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
        if (!req?.body?.cityId)
            throw "City Id is required!";
        let res = await City.updateOne({ _id: dataTypes.ObjectId(req.body.cityId) }, { isDeleted: true });
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