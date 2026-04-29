const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "college_pdfs",
    resource_type: "raw",
    allowed_formats: ["pdf"],
    public_id: (req, file) => {
      const fileName = file.originalname.replace(/\.[^/.]+$/, ""); // strip extension
      return `${Date.now()}-${fileName}`;
    },
  },
});


const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
});

module.exports = upload;

// const uploadSingle = (req, res, next) => {
//   upload.single("pdf")(req, res, (err) => {
//     if (err instanceof multer.MulterError) {
//       return res.status(400).json({ message: err.message });
//     } else if (err) {
//       return res.status(400).json({ message: err.message });
//     }
//     next();
//   });
// };

// module.exports = uploadSingle;
