
let Enterprise = require("../modal/enterprises"),
    Testi = require("../modal/testimonial"),
    dataTypes = require("../services/dataTypes/mongodb"),
    uploadImage = require("../services/fileUpload/upload");

exports.getDataByAdmin = async (req) => {
    try {
        let query = { isDeleted: false };
        let data = await Enterprise.findOne({});
        return {
            data: data,
            error: null,
            message: "SUCCESS",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside getDealer function in EnterpriseController ', error);
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
        let data = await Enterprise.aggregate([{ $match: { isDeleted: false } },
        {
            $lookup: {
                from: "cases",
                pipeline: [{ $match: { isDeleted: false, isActive: true } }, { $project: { title: 1, image: 1, titleShort: 1 } }],
                localField: "cases",
                foreignField: "_id",
                as: "cases"
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
                from: "clientales",
                pipeline: [{ $match: { isDeleted: false, isActive: true } }, { $project: { title: 1, image: 1 } }],
                localField: "clientale",
                foreignField: "_id",
                "as": "clientale"
            }
        }
        ]);
        let testi = await Testi.aggregate([
            {
                $match: {
                    placeTo: {
                        $in: ["Our-Enterprise"]
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
        console.log('Error while Enterprisedata in authController', error);
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
            const uploadResult = await uploadImage.uploadImage(req.files?.image, 'Enterprise');
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
        let { section, seo, benefit, formId, clientale, FAQ, cases, why, whyImage, builtFor } = req?.body;
        let data = await Enterprise.findOne({});
        if (data) {
            if (section?.length)
                data.section = section;
            if (builtFor?.length)
                data.builtFor = builtFor;
            if (seo)
                data.seo = seo;
            if (benefit?.length)
                data.benefit = benefit;
            if (formId)
                data.formId = formId;
            if (clientale?.length)
                data.clientale = clientale;
            if (FAQ?.length)
                data.FAQ = FAQ;
            if (cases?.length)
                data.cases = cases;
            if (whyImage)
                data.whyImage = whyImage;
            if (why?.length)
                data.why = why;
            saveData = await data.save();
        } else {
            var dataToSave = new Enterprise(req.body)
            saveData = await dataToSave.save();
        }
        return {
            data: saveData,
            error: null,
            message: "Saved Successfully",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside addEnterprise function in EnterpriseController ', error);
        return {
            data: null,
            error: error,
            message: "FAILED",
            statusCode: 500
        }
    }
}