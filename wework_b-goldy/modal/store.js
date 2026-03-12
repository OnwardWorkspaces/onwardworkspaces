var mongoose = require("mongoose"),
    dataTypes = require("../services/dataTypes/mongodb");
var storeSchema = new mongoose.Schema({
    image: { type: String, default: '' },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("imagestores", storeSchema);