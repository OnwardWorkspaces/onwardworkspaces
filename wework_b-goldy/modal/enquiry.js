var mongoose = require("mongoose");

var schema = new mongoose.Schema({
    name: { type: String, default: "" },
    email: { type: String, default: "" },
    mobile: { type: String, default: "" },
    message: { type: String, default: "" },
    from: { type: String, default: "" },
    zohoLeadId: { type: String, default: "" },
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("enquiries", schema);
