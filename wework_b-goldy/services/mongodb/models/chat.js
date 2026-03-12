var mongoose = require("mongoose");
// var passportLocalMongoose = require("passport-local-mongoose");
var dataTypes = require("../../dataTypes/mongodb");
var chatSchema = new mongoose.Schema({
    leadId: { type: dataTypes.ObjectId, required: true },
    msg: { type: String, required: true },
    from: { type: dataTypes.ObjectId, required:true },
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("Chat", chatSchema);