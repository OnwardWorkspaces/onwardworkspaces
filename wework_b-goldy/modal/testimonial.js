var mongoose = require("mongoose");
var dataTypes = require("../services/dataTypes/mongodb");

var testiSchema = new mongoose.Schema({
    name: { type: String, default: "" },
    desig: { type: String, default: "" },
    image: { type: String, default: 'https://eeasy.s3.ap-south-1.amazonaws.com/aahilya/Testi/placeholder.png' },
    video: { type: String, default: '' },
    type: { type: String, default: 'image' },
    placeTo: [{ type: String, default: 'Home' }],
    cityId: [{ type: dataTypes.ObjectId }],
    locationId: [{ type: dataTypes.ObjectId }],
    propertyId: [{ type: dataTypes.ObjectId }],
    officeId: [{ type: dataTypes.ObjectId }],
    desc: { type: String, default: '' },
    date: { type: String, default: '' },
    rating: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("testies", testiSchema);