
let Contact = require("../modal/contactus"),
    ContactForm = require("../modal/contactusform"),
    Testi = require("../modal/testimonial"),
    dataTypes = require("../services/dataTypes/mongodb"),
    sendingMail = require("../services/mail/mail"),
    uploadImage = require("../services/fileUpload/upload"),
    zoho = require("../services/zoho/zoho");

exports.getDataByAdmin = async (req) => {
    try {
        let query = { isDeleted: false };
        let data = await Contact.findOne({});
        return {
            data: data,
            error: null,
            message: "SUCCESS",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside getDealer function in ContactController ', error);
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
        let data = await Contact.aggregate([{ $match: { isDeleted: false } },
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
                        $in: ["Contact-Us"]
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
        console.log('Error while Contactdata in authController', error);
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
            const uploadResult = await uploadImage.uploadImage(req.files?.image, 'Contact');
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
        let { seo, formId, FAQ } = req?.body;
        let data = await Contact.findOne({});
        if (data) {
            if (seo)
                data.seo = seo;
            if (formId)
                data.formId = formId;
            if (FAQ?.length)
                data.FAQ = FAQ;
            saveData = await data.save();
        } else {
            var dataToSave = new Contact(req.body)
            saveData = await dataToSave.save();
        }
        return {
            data: saveData,
            error: null,
            message: "Saved Successfully",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside addContact function in ContactController ', error);
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
        var dataToSave = new ContactForm(req.body)
        saveData = await dataToSave.save();
        let mailData = {
            tables: req?.body?.form,
            interestedIn: req?.body?.interestedIn ? req?.body?.interestedIn : undefined,
            subject: "New Lead form submition",
            type: "lead"
        }

        // Extract flat fields from form array for Zoho
        let zohoData = {};
        req?.body?.form?.forEach(item => {
            const key = item?.title?.toLowerCase();
            if (key?.includes("name")) zohoData.name = item?.value;
            else if (key?.includes("email") || key?.includes("mail")) zohoData.email = item?.value;
            else if (key?.includes("mobile") || key?.includes("phone") || key?.includes("contact")) zohoData.mobile = item?.value;
            else if (key?.includes("message") || key?.includes("comment") || key?.includes("note")) zohoData.message = item?.value;
        });

        const [mailResult, zohoResult] = await Promise.allSettled([
            sendingMail.sendMail(mailData),
            zoho.createLead(zohoData),
        ]);

        const zohoLeadResult = zohoResult.status === 'fulfilled'
            ? zohoResult.value
            : { success: false, id: null, logs: [], error: String(zohoResult.reason) };

        return {
            data: saveData,
            zoho: {
                success: zohoLeadResult.success,
                leadId: zohoLeadResult.id || null,
                error: zohoLeadResult.error || null,
                logs: zohoLeadResult.logs || []
            },
            error: null,
            message: "Submitted",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside addContact function in ContactController ', error);
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
        var records = await ContactForm.aggregate([
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
        console.log('Error inside addContact function in ContactController ', error);
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
        var records = await ContactForm.findByIdAndUpdate(req?.body?.formId, { isDeleted: true });
        return {
            data: records,
            error: null,
            message: "SUCCESS",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside addContact function in ContactController ', error);
        return {
            data: null,
            error: error,
            message: "FAILED",
            statusCode: 500
        }
    }
}