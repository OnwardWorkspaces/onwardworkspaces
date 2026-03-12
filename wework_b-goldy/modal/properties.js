var mongoose = require("mongoose");
const dataTypes = require("../services/dataTypes/mongodb");

var blogSchema = new mongoose.Schema({
    upcoming: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    images: [{ type: String, default: '' }],
    isClient: { type: Boolean, default: false },
    clientale: [{ type: dataTypes.ObjectId }],
    isGallery: { type: Boolean, default: false },
    gallery: [{ type: String, default: '' }],
    isVideo: { type: Boolean, default: false },
    videos: [{ type: String, default: '' }],
    cityId: { type: dataTypes.ObjectId },
    formId: { type: dataTypes.ObjectId },
    locationId: { type: dataTypes.ObjectId },
    ameni: [{ type: dataTypes.ObjectId }],
    title: { type: String, required: true },
    path: { type: String, default: "" },
    price: { type: Number, default: 0 },
    seat: { type: Number, default: 0 },
    mapLocation: { type: String, default: "" },
    address: { type: String, default: "" },
    isNearBy: { type: Boolean, default: false },
    nearBy: [{
        title: { type: String, default: "" },
        distance: { type: String, default: "" },
        desc: { type: String, default: "" }
    }],
    isFAQ: { type: Boolean, default: false },
    FAQ: [{
        title: { type: String, default: "" },
        desc: { type: String, default: "" },
    }],
    seo: { type: String, default: "" },
    cliHead: { type: String, default: "" },
    cliPara: { type: String, default: "" },
    ameHead: { type: String, default: "" },
    amePara: { type: String, default: "" },
    galHead: { type: String, default: "" },
    galPara: { type: String, default: "" },
    mapHead: { type: String, default: "" },
    mapPara: { type: String, default: "" },
    proHead: { type: String, default: "" },
    proPara: { type: String, default: "" },
    testiHead: { type: String, default: "" },
    testiPara: { type: String, default: "" },
    faqHead: { type: String, default: "" },
    faqPara: { type: String, default: "" },
    bContent: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("properties", blogSchema);