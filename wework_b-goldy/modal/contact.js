var mongoose = require("mongoose"),
    dataTypes = require("../services/dataTypes/mongodb");
var blogSchema = new mongoose.Schema({
    name: { type: String, default: '' },
    email: { type: String, default: '' },
    msg: { type: String, default: '' },
    phone: { type: String, default: '' },
    tourId: { type: dataTypes.ObjectId },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("contacts", blogSchema);