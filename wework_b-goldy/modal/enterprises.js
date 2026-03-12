var mongoose = require("mongoose"),
    dataTypes = require("../services/dataTypes/mongodb");

var bannerSchema = new mongoose.Schema({
    section: [{
        image: { type: String, default: "" },
        title: { type: String, default: "" },
        desc: { type: String, default: "" }
    }],
    builtFor: [{
        image: { type: String, default: "" },
        title: { type: String, default: "" },
        desc: { type: String, default: "" }
    }],
    why: [{ type: String, default: "" }],
    whyImage: { type: String, default: "" },
    FAQ: [{
        title: { type: String, default: "" },
        desc: { type: String, default: "" },
    }],
    benefit: [{
        title: { type: String, default: "" },
        desc: { type: String, default: "" },
    }],
    cases: [{ type: dataTypes.ObjectId }],
    formId: { type: dataTypes.ObjectId },
    seo: { type: String, default: "" },
    clientale: [{ type: dataTypes.ObjectId }],
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("enterprises", bannerSchema);