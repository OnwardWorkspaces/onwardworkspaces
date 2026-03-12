var mongoose = require("mongoose");
var schema = new mongoose.Schema({
    name: { type: String, default: "" },
    email: { type: String, default: "" },
    mobile: { type: String, default: "" },
    message: { type: String, default: "" },
    from: { type: String, default: "" },
    interestedIn: { type: String, default: "" },
    formPosition: { type: String, default: "" },
    form: [{
        title: { type: String, default: "" },
        type: { type: String, default: "" },
        value: { type: String, default: "" },
    }],
    isDeleted: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("leads", schema);