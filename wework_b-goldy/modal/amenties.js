var mongoose = require("mongoose");
var dataTypes = require("../services/dataTypes/mongodb");

var schema = new mongoose.Schema({
    title: { type: String, default: "" },
    image: { type: String, default: "" },
    isDeleted: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("amenities", schema);