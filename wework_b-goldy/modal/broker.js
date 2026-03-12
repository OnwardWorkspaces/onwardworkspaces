var mongoose = require("mongoose");
var schema = new mongoose.Schema({
    name: { type: String, default: "" },
    email: { type: String, default: "" },
    mobile: { type: String, default: "" },
    city: { type: String, default: "" },
    location: { type: String, default: "" },
    area: { type: String, default: "" },
    floor: { type: String, default: "" },
    message: { type: String, default: "" },
    isDeleted: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("brokers", schema);