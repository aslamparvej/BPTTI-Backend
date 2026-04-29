const mongoose = require("mongoose");

const pdfSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    fileUrl: String,
    publicId: String,
    previewUrl: String,
    category: String,
    dateRange: { start: Date, end: Date },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Pdf", pdfSchema);