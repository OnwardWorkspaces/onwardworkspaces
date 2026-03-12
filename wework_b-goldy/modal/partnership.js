var mongoose = require("mongoose"),
    dataTypes = require("../services/dataTypes/mongodb");

var bannerSchema = new mongoose.Schema({
    benefit: [{
        image: { type: String, default: "" },
        title: { type: String, default: "" },
        desc: { type: String, default: "" }
    }],
    seo: { type: String, default: "" },
    pointTitle: { type: String, default: "" },
    formId: { type: dataTypes.ObjectId },
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("partnerships", bannerSchema);