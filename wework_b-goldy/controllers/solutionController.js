
let Solution = require("../modal/oursolution"),
    Testi = require("../modal/testimonial"),
    dataTypes = require("../services/dataTypes/mongodb"),
    uploadImage = require("../services/fileUpload/upload");

exports.getDataByAdmin = async (req) => {
    try {
        let query = { isDeleted: false };
        let data = await Solution.findOne({});
        return {
            data: data,
            error: null,
            message: "SUCCESS",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside getDealer function in SolutionController ', error);
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
        let data = await Solution.aggregate([{ $match: { isDeleted: false } },
        {
            $lookup: {
                from: "amenities",
                pipeline: [{ $match: { isDeleted: false, isActive: true } }, { $project: { title: 1, image: 1 } }],
                localField: "ameni",
                foreignField: "_id",
                as: "ameni"
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
                        $in: ["Our-Solution"]
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
        console.log('Error while Solutiondata in authController', error);
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
            const uploadResult = await uploadImage.uploadImage(req.files?.image, 'solution');
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
        let { section, seo, ameni, formId, clientale, FAQ } = req?.body;
        let data = await Solution.findOne({});
        if (data) {
            if (section?.length)
                data.section = section;
            if (seo)
                data.seo = seo;
            if (ameni?.length)
                data.ameni = ameni;
            if (formId)
                data.formId = formId;
            if (clientale?.length)
                data.clientale = clientale;
            if (FAQ?.length)
                data.FAQ = FAQ;
            saveData = await data.save();
        } else {
            var dataToSave = new Solution(req.body)
            saveData = await dataToSave.save();
        }
        return {
            data: saveData,
            error: null,
            message: "Saved Successfully",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside addSolution function in SolutionController ', error);
        return {
            data: null,
            error: error,
            message: "FAILED",
            statusCode: 500
        }
    }
}