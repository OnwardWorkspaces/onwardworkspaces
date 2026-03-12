var mongoose = require("mongoose");
var dataTypes = require("../services/dataTypes/mongodb");

var schema = new mongoose.Schema({
    title: { type: String, default: "" },
    image: { type: String, default: "" },
    gallery: [{ type: String, default: '' }],
    desc: { type: String, default: "" },
    catId: { type: dataTypes.ObjectId },
    isHighLight: { type: Boolean, default: false },
    highlight: [{
        title: { type: String, default: "" },
        image: { type: String, default: "" },
        desc: { type: String, default: "" },
    }],
    isFAQ: { type: Boolean, default: false },
    FAQ: [{
        title: { type: String, default: "" },
        desc: { type: String, default: "" },
    }],
    metaTitle: { type: String, default: "" },
    metaDesc: { type: String, default: "" },
    metaKeyword: { type: String, default: "" },
    isDeleted: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("workservices", schema);