const mongoose = require("mongoose");

const pdfSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    fileUrl: String,
    publicId: String,
    category: String,
    dateRange: { start: Date, end: Date },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Pdf", pdfSchema);

/* 
    1: Create Model -- done
    2: Create Controller -- done
    3: Create Routes -- done
    4: Middlelare for file upload
    5: Connect to Cloudinary
*/