
let Gallery = require("../modal/gallery"),
    dataTypes = require("../services/dataTypes/mongodb"),
    argon2 = require("argon2"),
    uploadImage = require("../services/fileUpload/upload"),
    moment = require("moment"),
    sendingMail = require("../services/mail/mail");
// let mailer = require("./authController");

exports.getData = async (req) => {
    try {
        const records = await Gallery.aggregate([
            {
                $match: { isDeleted: false },
            }, {
                $sort: { createdAt: -1 }
            }
        ]);
        return {
            data: records,
            error: null,
            message: "SUCCESS",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside getDealer function in GalleryController ', error);
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
            const uploadResult = await uploadImage.uploadImage(req.files?.image, 'Gallery');
            console.log('response from bucket', uploadResult);
            if (uploadResult && uploadResult?.statusCode == 200) {
                imagePath = uploadResult?.url;
                let data = new Gallery({ banner: imagePath })
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
        let res = await Gallery.updateOne({ _id: dataTypes.ObjectId(req.body.galleryId) }, { isDeleted: true });
        return {
            data: res,
            error: null,
            message: "SUCCESS",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside removeGallery function in GalleryController ', error);
        return {
            data: null,
            error: error,
            message: "FAILED",
            statusCode: 500
        }
    }
}

exports.banGallery = async (req) => {
    try {
        let updateGallery = await Gallery.updateOne({ _id: dataTypes.ObjectId(req.body.galleryId) }, { GalleryStatus: req.body.GalleryStatus })
        return {
            data: updateGallery,
            error: null,
            message: "SUCCESS",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside banGallery function in GalleryController ', error);
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
        console.log('id to update', req.body.galleryId, req.body);
        let find = await Gallery.findOne({ _id: req.body.galleryId });
        console.log('find property', find);
        let removeImage = await uploadImage.deleteImage("Gallery/" + find?.banner?.split("/")[find?.banner?.split("/").length - 1])
        // console.log('updating data', updatedData);
        let updateProperty = await Gallery.deleteOne({ _id: dataTypes.ObjectId(req.body.galleryId) });
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