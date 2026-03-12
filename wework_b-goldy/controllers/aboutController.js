
let About = require("../modal/aboutus"),
    Testi = require("../modal/testimonial"),
    dataTypes = require("../services/dataTypes/mongodb"),
    uploadImage = require("../services/fileUpload/upload");

exports.getDataByAdmin = async (req) => {
    try {
        let query = { isDeleted: false };
        let data = await About.findOne({});
        return {
            data: data,
            error: null,
            message: "SUCCESS",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside getDealer function in AboutController ', error);
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
        let data = await About.aggregate([{ $match: { isDeleted: false } }]);
        let testi = await Testi.aggregate([
            {
                $match: {
                    placeTo: {
                        $in: ["About-Us"]
                    },
                    type: "image",
                    isDeleted: false,
                    isActive: true
                }
            }
        ]);
        if (data?.length) {
            return {
                data: { ...data[0], testi },
                error: null,
                message: "SUCCESS",
                statusCode: 200
            }
        }
    } catch (error) {
        console.log('Error while Aboutdata in authController', error);
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
            const uploadResult = await uploadImage.uploadImage(req.files?.image, 'about');
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

exports.addData = async (req) => {
    try {
        let saveData = undefined;
        let { section, seo, pointTitle, pointImage, point, mediaDesc, media, founderDesc, founder } = req?.body;
        let data = await About.findOne({});

        if (data) {
            if (section?.length)
                data.section = section;
            if (seo)
                data.seo = seo;
            if (pointTitle)
                data.pointTitle = pointTitle;
            if (pointImage)
                data.pointImage = pointImage;
            if (point?.length)
                data.point = point;
            if (point)
                data.mediaDesc = mediaDesc;
            data.media = media;
            if (founderDesc)
                data.founderDesc = founderDesc;
            data.founder = founder;
            saveData = await data.save();
        } else {
            var dataToSave = new About(req.body)
            saveData = await dataToSave.save();
        }
        return {
            data: saveData,
            error: null,
            message: "Saved Successfully",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside addAbout function in AboutController ', error);
        return {
            data: null,
            error: error,
            message: "FAILED",
            statusCode: 500
        }
    }
}