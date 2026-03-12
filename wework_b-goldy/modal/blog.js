var mongoose = require("mongoose");
var dataTypes = require("../services/dataTypes/mongodb");

var blogSchema = new mongoose.Schema({
    catId: { type: dataTypes.ObjectId },
    authorId: { type: dataTypes.ObjectId },
    title: { type: String, required: true },
    path: { type: String, required: true },
    seo: { type: String, default: "" },
    titleShort: { type: String, required: true },
    image: { type: String, default: '' },
    banner: { type: String, default: '' },
    desc: { type: String, default: '' },
    include: { type: String, default: '' },
    addedBy: { type: dataTypes.ObjectId },
    isActive: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("blogs", blogSchema);