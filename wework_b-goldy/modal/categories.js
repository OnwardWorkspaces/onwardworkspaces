var mongoose = require("mongoose"),
    dataTypes = require("../services/dataTypes/mongodb");

var schema = new mongoose.Schema({
    title: { type: String, required: true },
    tagline: { type: String, default: "" },
    desc: { type: String, default: "" },
    isWhy: { type: Boolean, default: false },
    isCowork: { type: Boolean, default: false },
    image: { type: String, default: "" },
    why: [{
        title: { type: String, default: "" },
        desc: { type: String, default: "" }
    }],
    formId: { type: dataTypes.ObjectId },
    seo: { type: String, default: "" },
    locHead: { type: String, default: "" },
    locPara: { type: String, default: "" },
    offHead: { type: String, default: "" },
    offPara: { type: String, default: "" },
    whyHead: { type: String, default: "" },
    whyPara: { type: String, default: "" },
    startFrom: { type: String, default: "" },
    isDeleted: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("categories", schema);