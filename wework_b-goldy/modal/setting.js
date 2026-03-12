var mongoose = require("mongoose");
var bannerSchema = new mongoose.Schema({
    brokerImage: { type: String, default: "" },
    brokerSeo: { type: String, default: "" },
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("settings", bannerSchema);