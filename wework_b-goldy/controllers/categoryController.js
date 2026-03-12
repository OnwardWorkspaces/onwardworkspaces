
const moment = require("moment");
let Cate = require("../modal/categories"),
    Cities = require("../modal/cities"),
    Office = require("../modal/offices"),
    dataTypes = require("../services/dataTypes/mongodb"),
    uploadImage = require("../services/fileUpload/upload");

exports.imageUpload = async (req) => {
    try {
        let imagePath = null;
        if (req.files) {
            const uploadResult = await uploadImage.uploadImage(req.files?.image, "category");
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
        let { all } = req?.query;
        let query = { isDeleted: false, isActive: true };
        if (!all)
            query = { ...query, isCowork: { $nin: [true] } };
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

exports.getDataByTitle = async (req) => {
    try {
        let title = req?.query?.title;
        if (!title)
            throw "Title is required!";
        title = title.split("-").join(" ");
        let query = { isDeleted: false, isActive: true, title: { $regex: new RegExp(title, 'i') } };
        let records = await Cate.aggregate([{
            $match: query
        },
        {
            $lookup: {
                from: "offices",
                pipeline: [{ $match: { isDeleted: false, isActive: true } }, { $limit: 8 },
                {
                    $lookup: {
                        from: "cities",
                        pipeline: [{ $project: { title: 1 } }],
                        localField: "cityId",
                        foreignField: "_id",
                        as: "city"
                    }
                },
                { $project: { _id: 1, title: 1, image: 1, city: 1 } }],
                localField: "_id",
                foreignField: "catId",
                as: "offices"
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
            // {
            //     $project: {
            //         isDeleted: 0,
            //         createdAt: 0
            //     }
            // }
        ]);
        let cities = await Cities.aggregate([
            {
                $match: {
                    isDeleted: false,
                    isActive: true,
                }
            },
            {
                $lookup: {
                    from: "offices",
                    pipeline: [{ $match: { isDeleted: false, isActive: true } }, { $project: { _id: 1 } }],
                    localField: "_id",
                    foreignField: "cityId",
                    as: "offices"
                }
            },
            {
                $match: {
                    offices: { $exists: true, $ne: [] }
                }
            },
            {
                $project: {
                    title: 1,
                    image: 1,
                    offices: { $size: "$offices" }
                }
            },
        ]);
        return {
            data: records,
            cities,
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

exports.addData = async (req) => {
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

exports.updateData = async (req) => {
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

exports.removeData = async (req) => {
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