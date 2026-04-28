const Pdf = require("../models/Pdf");

// Upload PDF
const uploadPdf = async (req, res) => {
  try {
    const { title, fileUrl, publicId, category, dateRange } = req.body;
    const pdf = new Pdf({ title, fileUrl, publicId, category, dateRange });
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
    const { id } = req.params;
    const pdf = await Pdf.findById(req.params.id);
    if (!pdf) return res.status(404).json({ message: "Not found" });

    // await cloudinary.uploader.destroy(pdf.publicId, {
    //   resource_type: "raw",
    // });

    await pdf.deleteOne();
    res.status(200).json({ message: "PDF deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  uploadPdf,
  getAllPdfs,
  getPdfsByDateRange,
  deletePdf,
};
