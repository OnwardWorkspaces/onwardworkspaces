const moment = require("moment");
let Cate = require("../modal/categories"), 
    dataTypes = require("../services/dataTypes/mongodb"),
    uploadImage = require("../services/fileUpload/upload");
const ImageGallery = require("../modal/imageGallery");

// exports.imageUpload = async (req) => {
//     try {
//         let imagePath = null;

//         if (req.files && req.files.image) {

//             const uploadResult = await uploadImage.uploadImage(
//                 req.files.image,
//                 "gallery"
//             );

//             if (uploadResult.statusCode == 200) {
//                 imagePath = uploadResult.url;

//                 return {
//                     data: imagePath,
//                     error: null,
//                     message: "SUCCESS",
//                     statusCode: 200
//                 };
//             }
//         }

//         return {
//             data: null,
//             error: "Image file is required!",
//             message: "FAILED",
//             statusCode: 400
//         };

//     } catch (error) {
//         return {
//             data: null,
//             error,
//             message: "FAILED",
//             statusCode: 500
//         };
//     }
// };
exports.imageUpload = async (req) => {
    try {
        let imagePath = null;
        if (req.files) {
            const uploadResult = await uploadImage.uploadImage(req.files?.image, "imagegallery");
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
};
exports.addData = async (req) => {
    try {
        let dataExists = await ImageGallery.findOne({
            imageTitle: req.body.imageTitle,
            isDeleted: false
        });

        if (dataExists) {
            return {
                data: null,
                error: "Image with this title already exists!",
                message: "FAILED",
                statusCode: 208
            };
        }

        var gallery = new ImageGallery(req.body);

        let saveGallery = await gallery.save();

        return {
            data: saveGallery,
            error: null,
            message: "Image Gallery Added successfully.",
            statusCode: 200
        }; 

    } catch (error) {
        console.log("Gallery Add Error:", error);
        return {
            data: null,
            error,
            message: "FAILED",
            statusCode: 500
        };
    }
};

exports.getData = async () => {

    try {
            
        let records = await ImageGallery.find({
            isDeleted: false
            //isActive: true
        }).sort({ createdAt: -1 });

        return {
            data: records,
            error: null,
            message: "SUCCESS",
            statusCode: 200
        };

    } catch (error) {

        return {
            data: null,
            error,
            message: "FAILED",
            statusCode: 500
        };
    }

};

exports.getDataAdmin = async () => {

    try {

        let records = await ImageGallery.find({
            isDeleted: false
        }).sort({ createdAt: -1 });

        return {
            data: records,
            error: null,
            message: "SUCCESS",
            statusCode: 200
        };

    } catch (error) {

        return {
            data: null,
            error,
            message: "FAILED",
            statusCode: 500
        };
    }

};

exports.updateData = async (req) => {

    try {

        let updateObj = {
            imageTitle: req.body.imageTitle,
            altText: req.body.altText,
            galleryCategory: req.body.galleryCategory,
            isActive: req.body.isActive,
            updatedAt: Date.now()
        };

        if (req.files && req.files.image) {

            let upload = await exports.imageUpload(req);

            if (upload.statusCode == 200)
                updateObj.image = upload.data;
        }

        await ImageGallery.updateOne(
            {
                _id: dataTypes.ObjectId(req.body.galleryId)
            },
            updateObj
        );

        return {
            data: "Success",
            error: null,
            message: "Gallery Updated Successfully.",
            statusCode: 200
        };

    } catch (error) {

        return {
            data: null,
            error,
            message: "FAILED",
            statusCode: 500
        };
    }

};
exports.removeData = async (req) => {

    try {

        await ImageGallery.updateOne(
            {
                _id: dataTypes.ObjectId(req.body.galleryId)
            },
            {
                isDeleted: true
            }
        );

        return {
            data: "Success",
            error: null,
            message: "Gallery Deleted Successfully.",
            statusCode: 200
        };

    } catch (error) {

        return {
            data: null,
            error,
            message: "FAILED",
            statusCode: 500
        };
    }

};