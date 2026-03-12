
let Property = require("../modal/properties"),
    dataTypes = require("../services/dataTypes/mongodb"),
    argon2 = require("argon2"),
    uploadImage = require("../services/fileUpload/upload"),
    moment = require("moment"),
    sendingMail = require("../services/mail/mail");
// let mailer = require("./authController");

exports.getAdminData = async (req) => {
    try {
        const records = await Property.aggregate([
            {
                $match: { isDeleted: false },
            },
            {
                $lookup: {
                    from: "cities",
                    pipeline: [{ $project: { title: 1 } }],
                    localField: 'cityId',
                    foreignField: "_id",
                    as: "city"
                }
            },
            {
                $lookup: {
                    from: "locations",
                    pipeline: [{ $project: { title: 1 } }],
                    localField: 'locationId',
                    foreignField: "_id",
                    as: "location"
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
        console.log('Error inside getDealer function in PropertyController ', error);
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
        const records = await Property.aggregate([
            {
                $match: { isDeleted: false, isActive: true },
            },
            {
                $project: { title: 1 }
            }
        ]);
        return {
            data: records,
            error: null,
            message: "SUCCESS",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside getDealer function in PropertyController ', error);
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
        const records = await Property.aggregate([
            {
                $match: { isDeleted: false, isActive: true },
            },
            {
                $project: { title: 1 }
            }
        ]);
        return {
            data: records,
            error: null,
            message: "SUCCESS",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside getDealer function in PropertyController ', error);
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
            const uploadResult = await uploadImage.uploadImage(req.files?.image, 'property');
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
        let userRecord = await Property.aggregate(
            [{
                $match: {
                    path: req?.query?.path,
                    isDeleted: false,
                    isActive: true
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
                    from: "properties",
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
                    { $project: { title: 1, images: 1, seat: 1, path: 1, location: 1, city: 1 } }],
                    "as": "suggest"
                }
            },
            {
                $lookup: {
                    from: "testies",
                    pipeline: [{ $match: { isDeleted: false, isActive: true, type: "image" } }, { $limit: 8 }, { $project: { name: 1, image: 1, desc: 1, rating: 1, desig: 1 } }],
                    localField: "_id",
                    foreignField: "propertyId",
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
                    from: "cities",
                    localField: "cityId",
                    foreignField: "_id",
                    as: "city"
                }
            },
            {
                $lookup: {
                    from: "locations",
                    localField: "locationId",
                    foreignField: "_id",
                    as: "location"
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
                error: 'Property not found',
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
        let PropertyExits = await Property.findOne({
            title: req.body.title,
            isDeleted: false
        });
        if (PropertyExits) {
            return {
                data: null,
                error: "Property with this Title already Exist!",
                message: "FAILED",
                statusCode: 208
            }
        }
        var PropertyToSave = new Property(req.body)
        let saveProperty = await PropertyToSave.save();
        return {
            data: saveProperty,
            error: null,
            message: "Property added successfully.",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside addProperty function in PropertyController ', error);
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
        console.log('id to update', req.body.propertyId, req.body);
        let data = req.body;
        var updatedData = {
            ...data,
            updatedAt: Date.now()
        }
        // console.log('updating data', updatedData);
        let updateProperty = await Property.updateOne({ _id: dataTypes.ObjectId(req.body.propertyId) }, updatedData);
        return {
            data: updateProperty,
            error: null,
            message: "SUCCESS",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside updateProperty function in PropertyController ', error);
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
        let res = await Property.updateOne({ _id: dataTypes.ObjectId(req.body.propertyId) }, { isDeleted: true });
        return {
            data: res,
            error: null,
            message: "SUCCESS",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside removeProperty function in PropertyController ', error);
        return {
            data: null,
            error: error,
            message: "FAILED",
            statusCode: 500
        }
    }
}