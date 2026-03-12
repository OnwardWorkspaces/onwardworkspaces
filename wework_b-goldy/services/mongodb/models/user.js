var mongoose = require("mongoose");
var userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    socialId: { type: String, required: true },
    email: { type: String, default: '' },
    mobile: { type: String, default: '' },
    password: { type: String, default: '' },
    profile_picture: { type: String, default: '' },
    role: { type: String, default: 'User' },
    otp: { type: Number, default: 0000 },
    lang: { type: String, default: 'EN' },
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("Users", userSchema);