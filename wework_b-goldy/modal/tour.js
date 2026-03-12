var mongoose = require("mongoose"),
    dataTypes = require("../services/dataTypes/mongodb");
var destiSchema = new mongoose.Schema({
    name: { type: String, default: '' },
    imageTitle: { type: String, default: '' },
    amount: { type: String, default: '' },
    overview: { type: String, default: '' },
    desc: { type: String, default: '' },
    banner: { type: String, default: '' },
    images: [{ type: String, default: '' }],
    artistName: { type: String, default: '' },
    artistImage: { type: String, default: '' },
    artistDesc: { type: String, default: '' },
    highlightImage: { type: String, default: '' },
    highlightDesc: { type: String, default: '' },
    itin: [{
        title: { type: String, default: '' },
        desc: { type: String, default: '' }
    }],
    pdf: { type: String, default: "" },
    maps: [{
        title: { type: String, default: '' },
        lat: { type: Number, default: 0 },
        long: { type: Number, default: 0 }
    }],
    experienceId: { type: dataTypes.ObjectId },
    destinationId: { type: dataTypes.ObjectId },
    travelDate: [{ type: String, default: '' }],
    youtubeUrl: { type: String, default: '' },
    tourPoint: [{ about: { type: String, default: '' }, condition: { type: String, default: '' } }],
    pageTitle: { type: String, default: '' },
    pageDesc: { type: String, default: '' },
    pageKey: { type: String, default: '' },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("tours", destiSchema);