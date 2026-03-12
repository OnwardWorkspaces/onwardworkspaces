var mongoose = require("mongoose");
var experiSchema = new mongoose.Schema({
    name: { type: String, required: true },
    banner: { type: String, default: '' },
    bannerAlt: { type: String, default: '' },
    desc: { type: String, default: '' },
    pageTitle: { type: String, default: '' },
    pageDesc: { type: String, default: '' },
    pageKey: { type: String, default: '' },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("experiences", experiSchema);