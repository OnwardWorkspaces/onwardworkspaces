var mongoose = require("mongoose"),
    dataTypes = require("../services/dataTypes/mongodb");

var bannerSchema = new mongoose.Schema({
    section: [{
        image: { type: String, default: "" },
        title: { type: String, default: "" },
        desc: { type: String, default: "" }
    }],
    ameni: [{ type: dataTypes.ObjectId }],
    FAQ: [{
        title: { type: String, default: "" },
        desc: { type: String, default: "" },
    }],
    formId: { type: dataTypes.ObjectId },
    seo: { type: String, default: "" },
    clientale: [{ type: dataTypes.ObjectId }],
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("oursolutions", bannerSchema);