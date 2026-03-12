var mongoose = require("mongoose");
var schema = new mongoose.Schema({
    title: { type: String, required: true },
    heading: { type: String, default: "" },
    desc: { type: String, default: "" },
    image: { type: String, default: "" },
    field: [{
        title: { type: String, default: "" },
        type: { type: String, default: "" },
    }],
    isDeleted: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("forms", schema);