// Using Multer + Cloudinary
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: "your-cloud-name",
  api_key: "your-api-key",
  api_secret: "your-api-secret"
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "resumes",
    resource_type: "auto", // allows pdf, docx, etc.
  },
});

const upload = multer({ storage });

// Route
app.post("/upload-resume", upload.single("resume"), async (req, res) => {
  res.json({
    url: req.file.path, // Cloudinary URL
    originalName: req.file.originalname
  });
});

