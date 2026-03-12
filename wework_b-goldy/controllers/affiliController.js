
let Affili = require("../modal/affili"),
    dataTypes = require("../services/dataTypes/mongodb"),
    argon2 = require("argon2"),
    uploadImage = require("../services/fileUpload/upload"),
    moment = require("moment"),
    sendingMail = require("../services/mail/mail");
// let mailer = require("./authController");

exports.getData = async (req) => {
    try {
        const records = await Affili.aggregate([
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
        console.log('Error inside getDealer function in AffiliController ', error);
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
            const uploadResult = await uploadImage.uploadImage(req.files?.image, 'Affili');
            console.log('response from bucket', uploadResult);
            if (uploadResult && uploadResult?.statusCode == 200) {
                imagePath = uploadResult?.url;
                let data = new Affili({ image: imagePath })
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
        console.log('error while uploading affiliate', error)
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
        let res = await Affili.updateOne({ _id: dataTypes.ObjectId(req.body.affiliId) }, { isDeleted: true });
        return {
            data: res,
            error: null,
            message: "SUCCESS",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside removeAffili function in AffiliController ', error);
        return {
            data: null,
            error: error,
            message: "FAILED",
            statusCode: 500
        }
    }
}

exports.banAffili = async (req) => {
    try {
        let updateAffili = await Affili.updateOne({ _id: dataTypes.ObjectId(req.body.affiliId) }, { AffiliStatus: req.body.AffiliStatus })
        return {
            data: updateAffili,
            error: null,
            message: "SUCCESS",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside banAffili function in AffiliController ', error);
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
        console.log('id to update', req.body.affiliId, req.body);
        let find = await Affili.findOne({ _id: req.body.affiliId });
        console.log('find property', find);
        let removeImage = await uploadImage.deleteImage("Affili/" + find?.image?.split("/")[find?.image?.split("/").length - 1])
        // console.log('updating data', updatedData);
        let updateProperty = await Affili.deleteOne({ _id: dataTypes.ObjectId(req.body.affiliId) });
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