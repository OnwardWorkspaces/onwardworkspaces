
let Chat = require("../services/mongodb/models/chat"),
    dataTypes = require("../services/dataTypes/mongodb"),
    sendingMail = require("../services/mail/mail"),
    moment = require("moment");


exports.getChats = async (req) => {
    try {
        // console.log('query', page, size, sort, role, req.decodedToken);
        if (req?.id) {
            let { id } = req;
            // let query = { isDeleted: false, leadId: id };
            // const records = await Chat.find(query);
            const records = await Chat.aggregate([
                {
                  '$match': {
                    'isDeleted':false,
                    'leadId': {
                      '$eq': dataTypes.ObjectId(id)
                    }
                  }
                }, {
                  '$lookup': {
                    'from': 'users', 
                    'pipeline': [
                      {
                        '$project': {
                          'name': 1, 
                          'profile_picture': 1
                        }
                      }
                    ], 
                    'localField': 'from', 
                    'foreignField': '_id', 
                    'as': 'user'
                  }
                }
              ]);
              records.forEach(item=>{
                  item.createdAt = moment(item.createdAt).fromNow();
              });
            console.log('getting chats', records.length);
            return {
                data: records,
                error: null,
                message: "SUCCESS",
                statusCode: 200
            }
        }
        // let users = await User.aggregate([{
        //     $match: {
        //         isBlocked: false
        //     },
        // }
        // ]).sort({
        //     createdAt: "descending"
        // })
        // return {
        //     data: users,
        //     error: null,
        //     message: "SUCCESS",
        //     statusCode: 200
        // }
    } catch (error) {
        console.log('Error inside getChat function in chatController ', error);
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
            const uploadResult = await uploadImage.uploadThumb(req.files?.thumb);
            console.log('response from bucket', uploadResult);
            if (uploadResult && uploadResult?.statusCode == 200) {
                imagePath = uploadResult?.path;
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

exports.getUserById = async (req) => {
    try {
        let user = await User.aggregate(
            [{
                $match: {
                    _id: {
                        $eq: dataTypes.ObjectId(req.body.user_id)
                    },
                },
            },
            {
                $lookup: {
                    'from': 'companies',
                    'localField': 'companyId',
                    'foreignField': '_id',
                    'as': 'company'
                }
            }
            ]
        );
        if (user.length > 0) {
            delete user[0].password;
            if (user[0].company?.length > 0)
                user[0].company = user[0].company[0]
            return {
                user: user[0],
                error: null,
                message: "SUCCESS",
                statusCode: 200
            }
        } else {
            return {
                user: null,
                error: 'User not found',
                message: "SUCCESS",
                statusCode: 404
            }
        }
    } catch (error) {
        console.log('Error inside getUserById function in userController', error);
        return {
            data: null,
            error: error,
            message: "FAILED",
            statusCode: 500
        }
    }
}

exports.addChat = async (req) => {
    try {
        if (req.msg)
        var user = new Chat(req)
        let saveUser = await user.save();
        // return {
        //     data: saveUser,
        //     error: null,
        //     message: "Message Sent!",
        //     statusCode: 200
        // }
    } catch (error) {
        console.log('Error inside addChat function in chatController ', error);
        return {
            data: null,
            error: error,
            message: "FAILED",
            statusCode: 500
        }
    }
}

exports.updateUser = async (req) => {
    try {
        // console.log('id to update', req.body.user_id);
        let data = req.body;
        if (data?.password) {
            const passwordHashed = await argon2.hash(data.password);
            data.password = passwordHashed;
        }
        var updatedData = {
            ...data,
            updatedAt: Date.now()
        }
        // console.log('updating data', updatedData);
        let updateUser = await User.updateOne({ _id: req.body.user_id }, updatedData)
        return {
            data: updateUser,
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

exports.removeUser = async (req) => {
    try {
        let res = await User.updateOne({ _id: dataTypes.ObjectId(req.body.user_id) }, { isDeleted: true });
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

exports.banUser = async (req) => {
    try {
        let updateUser = await User.updateOne({ _id: dataTypes.ObjectId(req.body.user_id) }, { userStatus: req.body.userStatus })
        return {
            data: updateUser,
            error: null,
            message: "SUCCESS",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside banUser function in userController ', error);
        return {
            data: null,
            error: error,
            message: "FAILED",
            statusCode: 500
        }
    }
}