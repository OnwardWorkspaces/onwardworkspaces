var mongoose = require("mongoose"),
    dataTypes = require("../services/dataTypes/mongodb");
var destiSchema = new mongoose.Schema({
    name: { type: String, default: '' },
    imageTitle: { type: String, default: '' },
    desc: { type: String, default: '' },
    images: [{ type: String, default: '' }],
    tag: [{
        tagName: { type: String, default: '' },
        image: { type: String, default: '' },
        desc: { type: String, default: '' },
        pos: { type: Number, default: 1 }
    }],
    faq: [{
        question: { type: String, default: '' },
        answer: { type: String, default: '' }
    }],
    experienceId: { type: dataTypes.ObjectId },
    pageTitle: { type: String, default: '' },
    pageDesc: { type: String, default: '' },
    pageKey: { type: String, default: '' },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("destinations", destiSchema);