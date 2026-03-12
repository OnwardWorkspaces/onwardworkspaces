var mongoose = require("mongoose"),
    dataTypes = require("../services/dataTypes/mongodb");

var bannerSchema = new mongoose.Schema({
    title: { type: String, default: "" },
    imgAlt: { type: String, default: "" },
    subTitle: { type: String, default: '' },
    buttonTitle: { type: String, default: '' },
    logo: { type: String, default: '' },
    footerLogo: { type: String, default: '' },
    image: { type: String, default: '' },
    member: { type: Number, default: 0 },
    sqFeet: { type: Number, default: 0 },
    whyOnward: [{
        image: { type: String, default: "" },
        title: { type: String, default: "" },
        desc: { type: String, default: "" }
    }],
    header: [{
        title: { type: String, default: "" },
        isActive: { type: Boolean, default: true },
        pos: { type: Number, default: 0 }
    }],
    mediaDesc: { type: String, default: "" },
    media: [{
        image: { type: String, default: '' },
        url: { type: String, default: '' }
    }],
    clientale: [{ type: dataTypes.ObjectId }],
    formId: { type: dataTypes.ObjectId },
    cliHead: { type: String, default: "" },
    cliPara: { type: String, default: "" },
    propHead: { type: String, default: "" },
    propPara: { type: String, default: "" },
    connHead: { type: String, default: "" },
    connPara: { type: String, default: "" },
    whyHead: { type: String, default: "" },
    whyPara: { type: String, default: "" },
    catHead: { type: String, default: "" },
    catPara: { type: String, default: "" },
    testiHead: { type: String, default: "" },
    testiPara: { type: String, default: "" },
    galHead: { type: String, default: "" },
    galPara: { type: String, default: "" },
    seo: { type: String, default: "" },
    bContent: { type: String, default: "" },
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("homebanner", bannerSchema);