let Enquiry = require("../modal/enquiry"),
    dataTypes = require("../services/dataTypes/mongodb"),
    sendingMail = require("../services/mail/mail"),
    zoho = require("../services/zoho/zoho");

exports.getDataAdmin = async (req) => {
    try {
        let records = await Enquiry.aggregate([
            { $match: { isDeleted: false } },
            { $sort: { createdAt: -1 } }
        ]);
        return {
            data: records,
            error: null,
            message: "SUCCESS",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error in getDataAdmin enquiryController', error);
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
        let { name, email, mobile, message, from } = req.body;

        var enquiry = new Enquiry({ name, email, mobile, message, from });
        let saved = await enquiry.save();

        let tables = [
            { label: "Name", value: name },
            { label: "Email", value: email },
            { label: "Mobile", value: mobile },
            { label: "Message", value: message },
        ];
        let mailData = {
            tables,
            interestedIn: from || "Enquiry",
            subject: "New Enquiry form submission",
            type: "lead"
        }

        const [mailResult, zohoResult] = await Promise.allSettled([
            sendingMail.sendMail(mailData),
            zoho.createLead({ name, email, mobile, message }),
        ]);

        const zohoLead = zohoResult.status === 'fulfilled'
            ? zohoResult.value
            : { success: false, id: null, logs: [], error: String(zohoResult.reason) };

        if (zohoLead.success && zohoLead.id) {
            await Enquiry.updateOne({ _id: saved._id }, { zohoLeadId: zohoLead.id });
        }

        return {
            data: {
                mail: mailResult.status,
                zoho: {
                    success: zohoLead.success,
                    leadId: zohoLead.id || null,
                    error: zohoLead.error || null,
                    logs: zohoLead.logs || []
                }
            },
            error: null,
            message: "Enquiry Sent.",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error in addData enquiryController', error);
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
        if (!req?.body?.enquiryId)
            throw "Enquiry Id is required!"
        let res = await Enquiry.updateOne({ _id: dataTypes.ObjectId(req.body.enquiryId) }, { isDeleted: true });
        return {
            data: res,
            error: null,
            message: "SUCCESS",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error in removeData enquiryController', error);
        return {
            data: null,
            error: error,
            message: "FAILED",
            statusCode: 500
        }
    }
}
