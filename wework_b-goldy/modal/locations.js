var mongoose = require("mongoose");
var dataTypes = require("../services/dataTypes/mongodb");

var schema = new mongoose.Schema({
    title: { type: String, required: true },
    cityId: { type: dataTypes.ObjectId },
    image: { type: String, default: "" },
    heading: { type: String, default: "" },
    formId: { type: dataTypes.ObjectId },
    desc: { type: String, default: "" },
    path: { type: String, default: "" },
    isClient: { type: Boolean, default: false },
    clientale: [{ type: dataTypes.ObjectId }],
    isGallery: { type: Boolean, default: false },
    gallery: [{ type: String, default: '' }],
    isFAQ: { type: Boolean, default: false },
    FAQ: [{
        title: { type: String, default: "" },
        desc: { type: String, default: "" },
    }],
    seo: { type: String, default: "" },
    cliHead: { type: String, default: "" },
    cliPara: { type: String, default: "" },
    proHead: { type: String, default: "" },
    proPara: { type: String, default: "" },
    galHead: { type: String, default: "" },
    galPara: { type: String, default: "" },
    locHead: { type: String, default: "" },
    locPara: { type: String, default: "" },
    testiHead: { type: String, default: "" },
    testiPara: { type: String, default: "" },
    faqHead: { type: String, default: "" },
    faqPara: { type: String, default: "" },
    bContent: { type: String, default: "" },
    isDeleted: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("locations", schema);