const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "college_pdfs",
    resource_type: "raw", // important for PDF
    format: async () => "pdf"
  }
});

const upload = multer({ storage });

module.exports = upload;