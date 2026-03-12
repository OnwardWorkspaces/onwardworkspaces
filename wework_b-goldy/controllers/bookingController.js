
let Booking = require("../modal/booking"),
    dataTypes = require("../services/dataTypes/mongodb"),
    argon2 = require("argon2"),
    uploadImage = require("../services/fileUpload/upload"),
    moment = require("moment"),
    sendingMail = require("../services/mail/mail");
const Tour = require("../modal/tour");
// let mailer = require("./authController");

exports.getData = async (req) => {
    try {
        const records = await Booking.aggregate([
            {
                $match: { isDeleted: false },
            }
        ]);
        // console.log(records);
        records.forEach(item => {
            item.updatedAt = moment(item?.updatedAt).fromNow();
        })
        return {
            data: records,
            error: null,
            message: "SUCCESS",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside getDealer function in BookingController ', error);
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
            const uploadResult = await uploadImage.uploadImage(req.files?.image, 'Booking');
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

exports.getDataById = async (req) => {
    try {
        let bookingId = undefined;
        // console.log('id from query', req)
        if (req.query?.bookingId?.length == 4) {
            let allDesti = await Booking.aggregate([{ $match: { isActive: true, isDeleted: false } }]);
            allDesti.forEach(item => {
                let id = String(item?._id);
                if (id.slice(id.length - 4, id?.length) == req.query?.bookingId)
                    bookingId = item?._id;
            })
        } else {
            bookingId = req.query.bookingId
        }
        let userRecord = await Booking.aggregate(
            [{
                $match: {
                    _id: {
                        $eq: dataTypes.ObjectId(bookingId)
                    }
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
                error: 'Booking not found',
                message: "SUCCESS",
                statusCode: 404
            }
        }
    } catch (error) {
        console.log('Error inside getBookingById function in BookingController', error);
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
        var BookingToSave = new Booking(req.body);
        let saveBooking = await BookingToSave.save();
        let saved = Object.assign({}, saveBooking);
        let tour = await Tour.findOne({ _id: saveBooking?.tourId });
        let mailData = {
            ...saved?._doc,
            tourId: tour?.name,
            type: 'booking',
            subject: 'Thank you for sharing the booking form.'
        }
        let mail = sendingMail.sendMail(mailData);
        // console.log('response from mail', mail);
        return {
            data: saveBooking,
            error: null,
            message: "Booking added successfully.",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside addBooking function in BookingController ', error);
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
        console.log('id to update', req.body.bookingId, req.body);
        let data = req.body;
        var updatedData = {
            ...data,
            updatedAt: Date.now()
        }
        // console.log('updating data', updatedData);
        let updateBooking = await Booking.updateOne({ _id: dataTypes.ObjectId(req.body.bookingId) }, updatedData);
        return {
            data: updateBooking,
            error: null,
            message: "SUCCESS",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside updateBooking function in BookingController ', error);
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
        let res = await Booking.updateOne({ _id: dataTypes.ObjectId(req.body.bookingId) }, { isDeleted: true });
        return {
            data: res,
            error: null,
            message: "SUCCESS",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside removeBooking function in BookingController ', error);
        return {
            data: null,
            error: error,
            message: "FAILED",
            statusCode: 500
        }
    }
}

exports.banBooking = async (req) => {
    try {
        let updateBooking = await Booking.updateOne({ _id: dataTypes.ObjectId(req.body.bookingId) }, { BookingStatus: req.body.BookingStatus })
        return {
            data: updateBooking,
            error: null,
            message: "SUCCESS",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside banBooking function in BookingController ', error);
        return {
            data: null,
            error: error,
            message: "FAILED",
            statusCode: 500
        }
    }
}