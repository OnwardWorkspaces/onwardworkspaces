var mongoose = require("mongoose");
var bannerSchema = new mongoose.Schema({
    section: [{
        image: { type: String, default: "" },
        title: { type: String, default: "" },
        desc: { type: String, default: "" }
    }],
    seo: { type: String, default: "" },
    pointTitle: { type: String, default: "" },
    pointImage: { type: String, default: "" },
    point: [{
        title: { type: String, default: "" },
        desc: { type: String, default: "" }
    }],
    mediaDesc: { type: String, default: "" },
    media: [{
        image: { type: String, default: '' },
        url: { type: String, default: '' }
    }],
    founderDesc: { type: String, default: "" },
    founder: [{
        image: { type: String, default: "" },
        title: { type: String, default: "" },
        role: { type: String, default: "" },
        desc: { type: String, default: "" }
    }],
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("aboutus", bannerSchema);