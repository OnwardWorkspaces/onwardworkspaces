const mongoose = require("mongoose");
    dataTypes = require("../services/dataTypes/mongodb");
const imageGallerySchema = new mongoose.Schema(
  {
    image: { type: String, default: "" },
    imageTitle: { type: String, required: true },
    altText: { type: String, default: "" },
    sequence: {
        type: Number,
        required: true,
        default: 1
    },
    galleryCategory: {
        type: String,
        required: true,
        trim: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }, 
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
     
}
);

module.exports = mongoose.model("imageGallery", imageGallerySchema);