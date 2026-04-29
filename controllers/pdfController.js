const Pdf = require("../models/Pdf");
const cloudinary = require("../config/cloudinary");

// Upload PDF
const uploadPdf = async (req, res) => {
  try {
    const { title, category, dateRange } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "File not uploaded" });
    }

    if (!title || !category || !dateRange) {
      return res
        .status(400)
        .json({ message: "title, category, and dateRange are required" });
    }

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const publicId =
      req.file.filename ||
      req.file.public_id ||
      req.file.path.split("/").pop().split(".")[0];

    const baseUrl = req.file.path;
    // const fileUrl = baseUrl.replace("/upload/", "/upload/fl_inline/");
    const fileUrl = baseUrl;
    const previewUrl = baseUrl
      .replace("/upload/", "/upload/pg_1/")
      .replace(".pdf", ".jpg");

    const pdf = new Pdf({
      title,
      fileUrl,
      publicId,
      previewUrl,
      category,
      dateRange,
    });

    await pdf.save();
    res.status(201).json(pdf);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all PDFs
const getAllPdfs = async (req, res) => {
  try {
    const pdfs = await Pdf.find();
    res.status(200).json(pdfs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get PDF by date range
const getPdfsByDateRange = async (req, res) => {
  try {
    const { start, end } = req.query;
    const pdfs = await Pdf.find({
      "dateRange.start": { $gte: new Date(start) },
      "dateRange.end": { $lte: new Date(end) },
    });
    res.status(200).json(pdfs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete PDF
const deletePdf = async (req, res) => {
  try {
    const pdf = await Pdf.findById(req.params.id);
    if (!pdf) return res.status(404).json({ message: "Not found" });

    // Delete the raw asset from Cloudinary before removing the DB record
    await cloudinary.uploader.destroy(pdf.publicId, {
      resource_type: "raw",
    });

    await pdf.deleteOne();
    res.status(200).json({ message: "PDF deleted successfully" });
  } catch (error) {
    console.error("Error deleting PDF:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  uploadPdf,
  getAllPdfs,
  getPdfsByDateRange,
  deletePdf,
};
