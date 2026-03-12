var mongoose = require("mongoose"),
    dataTypes = require("../services/dataTypes/mongodb");

var bannerSchema = new mongoose.Schema({
    title: { type: String, default: "" },
    seo: { type: String, default: "" },
    section: [],
    clientale: [{ type: dataTypes.ObjectId }],
    testi: [{ type: dataTypes.ObjectId }],
    FAQ: [{
        title: { type: String, default: "" },
        desc: { type: String, default: "" },
    }],
    gallery: [{ type: String, default: "" }],
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("landings", bannerSchema);