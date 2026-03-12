
const Experience = require("../modal/experience");
let Tour = require("../modal/tour"),
    dataTypes = require("../services/dataTypes/mongodb"),
    argon2 = require("argon2"),
    uploadImage = require("../services/fileUpload/upload"),
    moment = require("moment"),
    sendingMail = require("../services/mail/mail");
// let mailer = require("./authController");

exports.getData = async (req) => {
    try {
        const records = await Tour.aggregate([
            {
                $match: { isDeleted: false, isActive: true },
            },
            {
                $limit: 9
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    overview: 1,
                    banner: 1,
                    travelDate: 1,
                    amount: 1,
                    itin: 1
                }
            }
        ]);
        // console.log(records);
        records.forEach(item => {
            item.updatedAt = moment(item?.updatedAt).fromNow();
            item.reviews = [];
            item.avgRating = 0;
            item.totalDays = item.itin?.length;
        })
        return {
            data: records,
            error: null,
            message: "SUCCESS",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside getDealer function in TourController ', error);
        return {
            data: null,
            error: error,
            message: "FAILED",
            statusCode: 500
        }
    }
}

exports.getGroupData = async (req) => {
    try {
        const { currentPage } = req?.body;
        let groupExp = await Experience.aggregate([{ $match: { name: "Group Tour" } }]);
        const records = await Tour.aggregate([
            {
                $match: { isDeleted: false, isActive: true, experienceId: dataTypes.ObjectId(groupExp[0]?._id) },
            },
            {
                $sort: { createdAt: -1 }
            },
            {
                $skip: currentPage ? currentPage * 9 : 0
            },
            {
                $limit: 9
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    overview: 1,
                    banner: 1,
                    travelDate: 1,
                    amount: 1,
                    itin: 1
                }
            }
        ]);
        // console.log(records);
        records.forEach(item => {
            item.updatedAt = moment(item?.updatedAt).fromNow();
            item.reviews = [];
            item.avgRating = 0;
            item.totalDays = item.itin?.length;
        })
        const totalTours = await Tour.countDocuments({ isDeleted: false, isActive: true, experienceId: dataTypes.ObjectId(groupExp[0]?._id) });
        let total = totalTours / 9;
        return {
            data: { exp: groupExp, tours: records, currentPage, totalPage: total },
            error: null,
            message: "SUCCESS",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside getDealer function in TourController ', error);
        return {
            data: null,
            error: error,
            message: "FAILED",
            statusCode: 500
        }
    }
}

exports.getDataByAdmin = async (req) => {
    try {
        const records = await Tour.aggregate([
            {
                $match: { isDeleted: false },
            }, {
                $lookup: {
                    from: 'experiences',
                    localField: 'experienceId',
                    foreignField: '_id',
                    as: 'experience'
                }
            }, {
                $lookup: {
                    from: 'bookings',
                    pipeline: [{ $match: { isPaid: true } }],
                    localField: '_id',
                    foreignField: 'tourId',
                    as: 'booking'
                }
            }
        ]);
        // console.log(records);
        records.forEach(item => {
            item.updatedAt = moment(item?.updatedAt).fromNow();
            item.reviews = [];
            item.avgRating = 0;
            item.totalDays = item.itin?.length;
        })
        return {
            data: records,
            error: null,
            message: "SUCCESS",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside getDealer function in TourController ', error);
        return {
            data: null,
            error: error,
            message: "FAILED",
            statusCode: 500
        }
    }
}

exports.getTourNames = async (req) => {
    try {
        const records = await Tour.aggregate([
            {
                $match: { isDeleted: false },
            },
            {
                $project: {
                    _id: 1,
                    name: 1
                }
            }
        ]);
        return {
            data: records,
            error: null,
            message: "SUCCESS",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside getDealer function in TourController ', error);
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
            const uploadResult = await uploadImage.uploadImage(req.files?.image, 'Tour');
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

exports.pdfDownload = async (req) => {
    try {
        if (!req?.body?.tourId && !req?.body?.email)
            throw 'Tour Id and email is required!';
        let tour = await Tour.findOne({ _id: req?.body?.tourId });
        if (tour) {
            let mailData = {
                email: req?.body?.email,
                tourName: tour?.name,
                subject: 'Download tour details!',
                type: 'pdf',
                pdf: tour?.pdf,
                emailType: 'user'
            }
            let mailResult = await sendingMail.sendMail(mailData);
            console.log(mailResult);
            return {
                data: "Email Sent!",
                error: null,
                message: "SUCCESS",
                statusCode: 200
            }
        } else {
            throw 'This tour not exists now!'
        }
    } catch (error) {
        return {
            data: null,
            error: error,
            message: "FAILED",
            statusCode: 400
        }
    }
}

exports.getDataById = async (req) => {
    try {
        let tourId = undefined;
        // console.log('id from query', req)
        if (req.query?.tourId?.length == 4) {
            let allDesti = await Tour.aggregate([{ $match: { isActive: true, isDeleted: false } }]);
            allDesti.forEach(item => {
                let id = String(item?._id);
                if (id.slice(id.length - 4, id?.length) == req.query?.tourId)
                    tourId = item?._id;
            })
        } else {
            tourId = req.query.tourId
        }
        let userRecord = await Tour.aggregate(
            [{
                $match: {
                    _id: {
                        $eq: dataTypes.ObjectId(tourId)
                    },
                },
            }, {
                $lookup: {
                    from: "tours",
                    pipeline: [{
                        $match: { _id: { $nin: [dataTypes.ObjectId(tourId)] } }
                    }, {
                        $limit: 2
                    }, {
                        $project: {
                            _id: 1,
                            name: 1,
                            banner: 1
                        }
                    }],
                    localField: "experienceId",
                    foreignField: "experienceId",
                    as: "releted"
                }
            },
            {
                $lookup: {
                    from: 'destinations',
                    pipeline: [{ $project: { _id: 1, name: 1 } }],
                    localField: 'destinationId',
                    foreignField: '_id',
                    as: 'desti'
                }
            },
            {
                $lookup: {
                    from: 'experiences',
                    pipeline: [{ $project: { _id: 1, name: 1 } }],
                    localField: 'experienceId',
                    foreignField: '_id',
                    as: 'experience'
                }
            }
            ]
        );
        if (userRecord.length > 0) {
            userRecord?.forEach((item) => {
                item.totalDay = item.itin?.length;
                item.totalReviews = 0;
            })
            return {
                data: userRecord[0],
                error: null,
                message: "SUCCESS",
                statusCode: 200
            }
        } else {
            return {
                data: null,
                error: 'Tour not found',
                message: "SUCCESS",
                statusCode: 404
            }
        }
    } catch (error) {
        console.log('Error inside getTourById function in TourController', error);
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
        var TourToSave = new Tour(req.body)
        let saveTour = await TourToSave.save();
        return {
            data: saveTour,
            error: null,
            message: "Tour added successfully.",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside addTour function in TourController ', error);
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
        // console.log('id to update', req.body.tourId, req.body);
        let data = req.body;
        var updatedData = {
            ...data,
            updatedAt: Date.now()
        }
        // console.log('updating data', updatedData);
        let updateTour = await Tour.updateOne({ _id: dataTypes.ObjectId(req.body.tourId) }, updatedData);
        return {
            data: updateTour,
            error: null,
            message: "SUCCESS",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside updateTour function in TourController ', error);
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
        let res = await Tour.updateOne({ _id: dataTypes.ObjectId(req.body.tourId) }, { isDeleted: true });
        return {
            data: res,
            error: null,
            message: "SUCCESS",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside removeTour function in TourController ', error);
        return {
            data: null,
            error: error,
            message: "FAILED",
            statusCode: 500
        }
    }
}

exports.banTour = async (req) => {
    try {
        let updateTour = await Tour.updateOne({ _id: dataTypes.ObjectId(req.body.tourId) }, { TourStatus: req.body.TourStatus })
        return {
            data: updateTour,
            error: null,
            message: "SUCCESS",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside banTour function in TourController ', error);
        return {
            data: null,
            error: error,
            message: "FAILED",
            statusCode: 500
        }
    }
}