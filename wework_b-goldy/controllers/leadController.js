
const moment = require("moment");
let Lead = require("../modal/leads"),
    dataTypes = require("./../services/dataTypes/mongodb"),
    sendingMail = require("../services/mail/mail");

exports.getDataAdmin = async (req) => {
    try {
        let query = { isDeleted: false };
        let records = await Lead.aggregate([{
            $match: query
        },
        {
            $sort: { createdAt: -1 }
        },
        {
            $project: {
                from: 1,
                formPosition: 1,
                createdAt: 1,
                interestedIn: 1,
                form: 1
            }
        }])
        return {
            data: records,
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

exports.addData = async (req) => {
    try {
        var user = new Lead(req.body)
        let saveUser = await user.save();
        let tables = [];
        req?.body?.form?.forEach(element => {
            tables.push(
                {
                    label: element?.title,
                    value: element?.value,
                });
        });
        let mailData = {
            tables,
            interestedIn: req?.body?.interestedIn,
            subject: "New Lead form submition",
            type: "lead"
        }
        const mailResult = await sendingMail.sendMail(mailData);
        console.log("mail result", mailResult);
        return {
            data: mailResult,
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
        await Lead.updateOne({ _id: dataTypes.ObjectId(req.body.leadId) }, updatedData);
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
        if (!req?.body?.leadId)
            throw "Lead Id is required!"
        let res = await Lead.updateOne({ _id: dataTypes.ObjectId(req.body.leadId) }, { isDeleted: true });
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