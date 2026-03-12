
let Partner = require("../modal/partnership"),
    PartnerForm = require("../modal/partnershipform"),
    Testi = require("../modal/testimonial"),
    dataTypes = require("../services/dataTypes/mongodb"),
    uploadImage = require("../services/fileUpload/upload");

exports.getDataByAdmin = async (req) => {
    try {
        let query = { isDeleted: false };
        let data = await Partner.findOne({});
        return {
            data: data,
            error: null,
            message: "SUCCESS",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside getDealer function in PartnerController ', error);
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
        let data = await Partner.aggregate([{ $match: { isDeleted: false } },
        {
            $lookup: {
                from: "forms",
                localField: "formId",
                foreignField: "_id",
                as: "form"
            }
        }]);
        let testi = await Testi.aggregate([
            {
                $match: {
                    placeTo: {
                        $in: ["Partner-Us"]
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
        console.log('Error while Partnerdata in authController', error);
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
            const uploadResult = await uploadImage.uploadImage(req.files?.image, 'Partner');
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
        let { benefit, seo, pointTitle, formId } = req?.body;
        let data = await Partner.findOne({});
        if (data) {
            if (benefit?.length)
                data.benefit = benefit;
            if (seo)
                data.seo = seo;
            if (pointTitle)
                data.pointTitle = pointTitle;
            if (formId)
                data.formId = formId;
            saveData = await data.save();
        } else {
            var dataToSave = new Partner(req.body)
            saveData = await dataToSave.save();
        }
        return {
            data: saveData,
            error: null,
            message: "Saved Successfully",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside addPartner function in PartnerController ', error);
        return {
            data: null,
            error: error,
            message: "FAILED",
            statusCode: 500
        }
    }
}

exports.addFormData = async (req) => {
    try {
        var dataToSave = new PartnerForm(req.body)
        saveData = await dataToSave.save();
        return {
            data: saveData,
            error: null,
            message: "Submitted",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside addPartner function in PartnerController ', error);
        return {
            data: null,
            error: error,
            message: "FAILED",
            statusCode: 500
        }
    }
}

exports.getFormData = async (req) => {
    try {
        var records = await PartnerForm.aggregate([
            {
                $match: { isDeleted: false }
            },
            {
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
        console.log('Error inside addPartner function in PartnerController ', error);
        return {
            data: null,
            error: error,
            message: "FAILED",
            statusCode: 500
        }
    }
}

exports.deleteFormData = async (req) => {
    try {
        var records = await PartnerForm.findByIdAndUpdate(req?.body?.formId, { isDeleted: true });
        return {
            data: records,
            error: null,
            message: "SUCCESS",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside addPartner function in PartnerController ', error);
        return {
            data: null,
            error: error,
            message: "FAILED",
            statusCode: 500
        }
    }
}