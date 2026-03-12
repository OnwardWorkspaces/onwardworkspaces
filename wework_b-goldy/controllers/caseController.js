let Case = require("../modal/cases"),
    dataTypes = require("../services/dataTypes/mongodb"),
    argon2 = require("argon2"),
    uploadImage = require("../services/fileUpload/upload"),
    moment = require("moment"),
    sendingMail = require("../services/mail/mail");
// let mailer = require("./authController");

//Case Controls
exports.getData = async (req) => {
    try {
        const records = await Case.aggregate([
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
        console.log('Error inside getDealer function in CaseController ', error);
        return {
            data: null,
            error: error,
            message: "FAILED",
            statusCode: 500
        }
    }
}

exports.getDrop = async (req) => {
    try {
        const records = await Case.aggregate([
            {
                $match: { isDeleted: false, isActive: true },
            }
        ]);
        return {
            data: records,
            error: null,
            message: "SUCCESS",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside getDealer function in CaseController ', error);
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
            const uploadResult = await uploadImage.uploadImage(req.files?.image, 'Case');
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

exports.getDataByTitle = async (req) => {
    try {
        if (!req.query?.title)
            throw "Case Title is Required!";
        let title = req?.query?.title?.split("-")?.join(" ");
        let userRecord = await Case.aggregate(
            [{
                $match: {
                    titleShort: { $regex: new RegExp(title, 'i') },
                    isDeleted: false,
                    isActive: true
                }
            }
            ]
        );
        if (userRecord.length > 0) {
            return {
                data: userRecord[0],
                error: null,
                message: "SUCCESS",
                statusCode: 200
            }
        } else {
            return {
                data: null,
                error: 'Case not found',
                message: "SUCCESS",
                statusCode: 404
            }
        }
    } catch (error) {
        console.log('Error inside getCaseById function in CaseController', error);
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
        let CaseExits = await Case.findOne({
            title: req?.body?.title,
            isDeleted: false
        });
        if (CaseExits) {
            return {
                data: null,
                error: "Case with this title already Exist!",
                message: "FAILED",
                statusCode: 208
            }
        }
        var CaseToSave = new Case(req.body)
        let saveCase = await CaseToSave.save();
        return {
            data: saveCase,
            error: null,
            message: "Case added successfully.",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside addCase function in CaseController ', error);
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
        console.log('id to update', req.body.caseId, req.body);
        let data = req.body;
        var updatedData = {
            ...data,
            updatedAt: Date.now()
        }
        // console.log('updating data', updatedData);
        let updateCase = await Case.updateOne({ _id: dataTypes.ObjectId(req.body.caseId) }, updatedData);
        return {
            data: updateCase,
            error: null,
            message: "SUCCESS",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside updateCase function in CaseController ', error);
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
        let res = await Case.updateOne({ _id: dataTypes.ObjectId(req.body.caseId) }, { isDeleted: true });
        return {
            data: res,
            error: null,
            message: "SUCCESS",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside removeCase function in CaseController ', error);
        return {
            data: null,
            error: error,
            message: "FAILED",
            statusCode: 500
        }
    }
}

exports.banCase = async (req) => {
    try {
        let updateCase = await Case.updateOne({ _id: dataTypes.ObjectId(req.body.caseId) }, { CaseStatus: req.body.CaseStatus })
        return {
            data: updateCase,
            error: null,
            message: "SUCCESS",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside banCase function in CaseController ', error);
        return {
            data: null,
            error: error,
            message: "FAILED",
            statusCode: 500
        }
    }
}