const mongoose = require("mongoose");
    dataTypes = require("../services/dataTypes/mongodb");
const imageGallerySchema = new mongoose.Schema(
  {
    image: { type: String, default: "" },
    imageTitle: { type: String, required: true },
    altText: { type: String, default: "" },
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
    createdAt: Date,
    updatedAt: Date
}
);

module.exports = mongoose.model("imageGallery", imageGallerySchema);