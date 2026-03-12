var mongoose = require("mongoose"),
    dataTypes = require("../services/dataTypes/mongodb");

var schema = new mongoose.Schema({
    catId: { type: dataTypes.ObjectId },
    title: { type: String, required: true },
    path: { type: String, default: "" },
    desc: { type: String, default: "" },
    image: { type: String, default: "" },
    isGallery: { type: Boolean, default: false },
    gallery: [{ type: String, default: '' }],
    cityId: { type: dataTypes.ObjectId },
    isClient: { type: Boolean, default: false },
    clientale: [{ type: dataTypes.ObjectId }],
    isFAQ: { type: Boolean, default: false },
    FAQ: [{
        title: { type: String, default: "" },
        desc: { type: String, default: "" },
    }],
    cliHead: { type: String, default: "" },
    cliPara: { type: String, default: "" },
    galHead: { type: String, default: "" },
    galPara: { type: String, default: "" },
    offHead: { type: String, default: "" },
    offPara: { type: String, default: "" },
    testiHead: { type: String, default: "" },
    testiPara: { type: String, default: "" },
    faqHead: { type: String, default: "" },
    faqPara: { type: String, default: "" },
    formId: { type: dataTypes.ObjectId },
    seo: { type: String, default: "" },
    bContent: { type: String, default: "" },
    isDeleted: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("offices", schema);