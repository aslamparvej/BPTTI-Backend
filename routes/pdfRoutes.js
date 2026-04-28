const express = require("express");
const router = express.Router();


const upload = require("../middleware/upload");
const auth = require("../middleware/authMiddleware");
const pdfController = require("../controllers/pdfController");

// Upload (protected)
router.post("/upload", auth, upload.single("pdf"), pdfController.uploadPdf);

// Get PDFs
router.get("/", pdfController.getAllPdfs);

// Delete
router.delete("/:id", auth, pdfController.deletePdf);

module.exports = router;