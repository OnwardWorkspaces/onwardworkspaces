
let Store = require("../modal/store"),
    dataTypes = require("../services/dataTypes/mongodb"),
    argon2 = require("argon2"),
    uploadImage = require("../services/fileUpload/upload"),
    moment = require("moment"),
    sendingMail = require("../services/mail/mail");
// let mailer = require("./authController");

exports.getData = async (req) => {
    try {
        const records = await Store.aggregate([
            {
                $match: { isDeleted: false },
            }
        ]);
        return {
            data: records,
            error: null,
            message: "SUCCESS",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside getDealer function in StoreController ', error);
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
            const uploadResult = await uploadImage.uploadImage(req.files?.image, 'store');
            console.log('response from bucket', uploadResult);
            if (uploadResult && uploadResult?.statusCode == 200) {
                imagePath = uploadResult?.url;
                let data = new Store({ image: imagePath })
                let record = data.save();
                return {
                    data: record,
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

exports.removeData = async (req) => {
    try {
        let res = await Store.updateOne({ _id: dataTypes.ObjectId(req.body.storeId) }, { isDeleted: true });
        return {
            data: res,
            error: null,
            message: "SUCCESS",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside removeStore function in StoreController ', error);
        return {
            data: null,
            error: error,
            message: "FAILED",
            statusCode: 500
        }
    }
}

exports.banStore = async (req) => {
    try {
        let updateStore = await Store.updateOne({ _id: dataTypes.ObjectId(req.body.storeId) }, { StoreStatus: req.body.StoreStatus })
        return {
            data: updateStore,
            error: null,
            message: "SUCCESS",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside banStore function in StoreController ', error);
        return {
            data: null,
            error: error,
            message: "FAILED",
            statusCode: 500
        }
    }
}

exports.removeImage = async (req) => {
    try {
        console.log('id to update', req.body.storeId, req.body);
        let find = await Store.findOne({ _id: req.body.storeId });
        console.log('find property', find);
        let removeImage = await uploadImage.deleteImage("store/" + find?.banner?.split("/")[find?.banner?.split("/").length - 1])
        // console.log('updating data', updatedData);
        let updateProperty = await Store.deleteOne({ _id: dataTypes.ObjectId(req.body.storeId) });
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