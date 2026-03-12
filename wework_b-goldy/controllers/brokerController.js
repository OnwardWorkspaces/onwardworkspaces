let Broker = require("../modal/broker"),
    Setting = require("../modal/setting"),
    dataTypes = require("./../services/dataTypes/mongodb"),
    uploadImage = require("../services/fileUpload/upload");

exports.imageUpload = async (req) => {
    try {
        let imagePath = null;
        if (req.files) {
            const uploadResult = await uploadImage.uploadImage(req.files?.image, 'broker');
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

exports.getDataAdmin = async (req) => {
    try {
        let query = { isDeleted: false };
        let brokerImage = await Setting.findOne({});
        let records = await Broker.aggregate([{
            $match: query
        },
        {
            $sort: { createdAt: -1 }
        },
            // {
            //     $project: {
            //         name: 1,
            //         email: 1,
            //         mobile: 1,
            //         message: 1,
            //         from: 1,
            //         formPosition: 1,
            //         createdAt: 1,
            //         interestedIn: 1
            //     }
            // }
        ]);
        return {
            data: records,
            brokerImage: brokerImage?.brokerImage,
            brokerSeo: brokerImage?.brokerSeo,
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

exports.getBrokerImage = async (req) => {
    try {
        let brokerImage = await Setting.findOne({});
        return {
            data: brokerImage,
            error: null,
            message: "SUCCESS",
            statusCode: 200
        }
    }
    catch (error) {
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
        var user = new Broker(req.body)
        let saveUser = await user.save();
        return {
            data: saveUser,
            error: null,
            message: "Enquiry Sent.",
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
        await Broker.updateOne({ _id: dataTypes.ObjectId(req.body.brokerId) }, updatedData);
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
        if (!req?.body?.brokerId)
            throw "Broker Id is required!"
        let res = await Broker.updateOne({ _id: dataTypes.ObjectId(req.body.brokerId) }, { isDeleted: true });
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

exports.updateFormImage = async (req) => {
    try {
        let res = await Setting.findOne({});
        let data = undefined;
        if (res) {
            if (req?.body?.brokerImage)
                res.brokerImage = req?.body?.brokerImage;
            if (req?.body?.brokerSeo)
                res.brokerSeo = req?.body?.brokerSeo;
            data = await res.save();
        } else {
            let dataToSave = new Setting(req?.body);
            data = await dataToSave.save();
        }
        return {
            data: data,
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