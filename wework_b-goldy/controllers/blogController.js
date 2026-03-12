
let Blog = require("../modal/blog"),
    BlogCat = require("../modal/blogCat"),
    BlogAuthor = require("../modal/blogAuthor"),
    BlogComment = require("../modal/blogComment"),
    dataTypes = require("../services/dataTypes/mongodb"),
    argon2 = require("argon2"),
    uploadImage = require("../services/fileUpload/upload"),
    moment = require("moment"),
    sendingMail = require("../services/mail/mail");
// let mailer = require("./authController");

//Category Controls
exports.getCatData = async (req) => {
    try {
        const records = await BlogCat.aggregate([
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
        console.log('Error inside getDealer function in BlogController ', error);
        return {
            data: null,
            error: error,
            message: "FAILED",
            statusCode: 500
        }
    }
}

exports.addCatData = async (req) => {
    try {
        let BlogExits = await BlogCat.findOne({
            title: req.body.title,
            isDeleted: false
        });
        if (BlogExits) {
            return {
                data: null,
                error: "Category with this title already Exist!",
                message: "FAILED",
                statusCode: 208
            }
        }
        var BlogToSave = new BlogCat(req.body)
        let saveBlog = await BlogToSave.save();
        return {
            data: saveBlog,
            error: null,
            message: "Blog added successfully.",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside addBlog function in BlogController ', error);
        return {
            data: null,
            error: error,
            message: "FAILED",
            statusCode: 500
        }
    }
}

exports.updateCatData = async (req) => {
    try {
        console.log('id to update', req.body.catId, req.body);
        let data = req.body;
        var updatedData = {
            ...data,
            updatedAt: Date.now()
        }
        // console.log('updating data', updatedData);
        let updateBlog = await BlogCat.updateOne({ _id: dataTypes.ObjectId(req.body.catId) }, updatedData);
        return {
            data: updateBlog,
            error: null,
            message: "SUCCESS",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside updateBlog function in BlogController ', error);
        return {
            data: null,
            error: error,
            message: "FAILED",
            statusCode: 500
        }
    }
}

exports.removeCatData = async (req) => {
    try {
        let res = await BlogCat.updateOne({ _id: dataTypes.ObjectId(req.body.catId) }, { isDeleted: true });
        return {
            data: res,
            error: null,
            message: "SUCCESS",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside removeBlog function in BlogController ', error);
        return {
            data: null,
            error: error,
            message: "FAILED",
            statusCode: 500
        }
    }
}

//Author Controls
exports.getAuthorData = async (req) => {
    try {
        const records = await BlogAuthor.aggregate([
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
        console.log('Error inside getDealer function in BlogController ', error);
        return {
            data: null,
            error: error,
            message: "FAILED",
            statusCode: 500
        }
    }
}

exports.addAuthorData = async (req) => {
    try {
        let BlogExits = await BlogAuthor.findOne({
            title: req.body.title,
            isDeleted: false
        });
        if (BlogExits) {
            return {
                data: null,
                error: "Category with this title already Exist!",
                message: "FAILED",
                statusCode: 208
            }
        }
        var BlogToSave = new BlogAuthor(req.body)
        let saveBlog = await BlogToSave.save();
        return {
            data: saveBlog,
            error: null,
            message: "Blog added successfully.",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside addBlog function in BlogController ', error);
        return {
            data: null,
            error: error,
            message: "FAILED",
            statusCode: 500
        }
    }
}

exports.updateAuthorData = async (req) => {
    try {
        console.log('id to update', req.body.authorId, req.body);
        let data = req.body;
        var updatedData = {
            ...data,
            updatedAt: Date.now()
        }
        // console.log('updating data', updatedData);
        let updateBlog = await BlogAuthor.updateOne({ _id: dataTypes.ObjectId(req.body.authorId) }, updatedData);
        return {
            data: updateBlog,
            error: null,
            message: "SUCCESS",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside updateBlog function in BlogController ', error);
        return {
            data: null,
            error: error,
            message: "FAILED",
            statusCode: 500
        }
    }
}

exports.removeAuthorData = async (req) => {
    try {
        let res = await BlogAuthor.updateOne({ _id: dataTypes.ObjectId(req.body.authorId) }, { isDeleted: true });
        return {
            data: res,
            error: null,
            message: "SUCCESS",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside removeBlog function in BlogController ', error);
        return {
            data: null,
            error: error,
            message: "FAILED",
            statusCode: 500
        }
    }
}

//Blog Controls
exports.getDataAdmin = async (req) => {
    try {
        const records = await Blog.aggregate([
            {
                $match: { isDeleted: false },
            },
            {
                $lookup: {
                    from: "blogcats",
                    pipeline: [{ $project: { title: 1 } }],
                    localField: "catId",
                    foreignField: "_id",
                    as: "categories"
                }
            },
            {
                $lookup: {
                    from: "blogauthors",
                    pipeline: [{ $project: { title: 1 } }],
                    localField: "authorId",
                    foreignField: "_id",
                    as: "authors"
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
        console.log('Error inside getDealer function in BlogController ', error);
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
        const records = await Blog.aggregate([
            {
                $match: { isDeleted: false, isActive: true },
            },
            {
                $lookup: {
                    from: "blogcats",
                    pipeline: [{ $project: { title: 1 } }],
                    localField: "catId",
                    foreignField: "_id",
                    as: "categories"
                }
            },
            {
                $lookup: {
                    from: "blogauthors",
                    pipeline: [{ $project: { title: 1 } }],
                    localField: "authorId",
                    foreignField: "_id",
                    as: "authors"
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
        console.log('Error inside getDealer function in BlogController ', error);
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
            const uploadResult = await uploadImage.uploadImage(req.files?.image, 'Blog');
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
            throw "Blog Title is Required!";
        let title = req?.query?.title?.split("-")?.join(" ");
        let userRecord = await Blog.aggregate(
            [{
                $match: {
                    path: req.query?.title,
                    isDeleted: false,
                    isActive: true
                }
            }, {
                $lookup: {
                    from: 'blogcomments',
                    pipeline: [{ $sort: { createdAt: -1 } }],
                    localField: '_id',
                    foreignField: 'blogId',
                    as: "comment"
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
                error: 'Blog not found',
                message: "SUCCESS",
                statusCode: 404
            }
        }
    } catch (error) {
        console.log('Error inside getBlogById function in BlogController', error);
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
        let BlogExits = await Blog.findOne({
            title: req?.body?.title,
            isDeleted: false
        });
        if (BlogExits) {
            return {
                data: null,
                error: "Blog already Exist!",
                message: "FAILED",
                statusCode: 208
            }
        }
        var BlogToSave = new Blog(req.body)
        let saveBlog = await BlogToSave.save();
        return {
            data: saveBlog,
            error: null,
            message: "Blog added successfully.",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside addBlog function in BlogController ', error);
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
        console.log('id to update', req.body.blogId, req.body);
        let data = req.body;
        var updatedData = {
            ...data,
            updatedAt: Date.now()
        }
        console.log("data",data);
        // console.log('updating data', updatedData);
        let updateBlog = await Blog.updateOne({ _id: dataTypes.ObjectId(req.body.blogId) }, updatedData);
        return {
            data: updateBlog,
            error: null,
            message: "SUCCESS",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside updateBlog function in BlogController ', error);
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
        let res = await Blog.updateOne({ _id: dataTypes.ObjectId(req.body.blogId) }, { isDeleted: true });
        return {
            data: res,
            error: null,
            message: "SUCCESS",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside removeBlog function in BlogController ', error);
        return {
            data: null,
            error: error,
            message: "FAILED",
            statusCode: 500
        }
    }
}

exports.banBlog = async (req) => {
    try {
        let updateBlog = await Blog.updateOne({ _id: dataTypes.ObjectId(req.body.blogId) }, { BlogStatus: req.body.BlogStatus })
        return {
            data: updateBlog,
            error: null,
            message: "SUCCESS",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside banBlog function in BlogController ', error);
        return {
            data: null,
            error: error,
            message: "FAILED",
            statusCode: 500
        }
    }
}

exports.likeBlog = async (req) => {
    try {
        let updateBlog = await Blog.updateOne({ _id: dataTypes.ObjectId(req.body.blogId) }, { $inc: { like: 1 } });
        return {
            data: updateBlog,
            error: null,
            message: "SUCCESS",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside updateBlog function in BlogController ', error);
        return {
            data: null,
            error: error,
            message: "FAILED",
            statusCode: 500
        }
    }
}

exports.addComment = async (req) => {
    try {
        let commentToSave = new BlogComment(req?.body);
        let saved = await commentToSave.save();
        return {
            data: saved,
            error: null,
            message: "SUCCESS",
            statusCode: 200
        }
    } catch (error) {
        console.log('Error inside updateBlog function in BlogController ', error);
        return {
            data: null,
            error: error,
            message: "FAILED",
            statusCode: 500
        }
    }
}