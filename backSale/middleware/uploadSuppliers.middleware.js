const multer = require("multer");
const path = require("path");
const fs = require("fs");

const SUPPLIER_DIR = path.join(__dirname, "../public/uploadsSuppliers");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    fs.mkdirSync(SUPPLIER_DIR, { recursive: true });
    cb(null, SUPPLIER_DIR);
  },
  filename: (req, file, cb) => {
    const extName = path.extname(file.originalname).toLowerCase();
    // random suffix avoids two uploads in the same millisecond overwriting each other
    const filename = `${Date.now()}-${Math.round(Math.random() * 1e6)}${extName}`;
    cb(null, filename);
  },
});

const fileFilter = (req, file, cb) => {
  const allowType = ["image/png", "image/gif", "image/jpeg", "image/webp"];
  if (allowType.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only PNG, GIF, JPEG or WEBP images are allowed"), false);
  }
};

const uploadSuppliers = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

// Wraps multer so its errors return JSON instead of an HTML error page
const handleSupplierUpload = (req, res, next) => {
  uploadSuppliers.single("image")(req, res, (err) => {
    if (!err) return next();

    const message =
      err.code === "LIMIT_FILE_SIZE" ? "Image must be 5 MB or smaller." : err.message;

    return res.status(400).json({ success: false, message });
  });
};

// Deletes one saved supplier image by filename (safe if the file is missing)
const deleteImageFile = (filename) => {
  if (!filename) return;
  const filePath = path.join(SUPPLIER_DIR, path.basename(filename));
  fs.unlink(filePath, () => {});
};

// Route handler: DELETE image by name (fixed folder)
const removeImage = (req, res) => {
  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({ connect: false, error: "Image is required" });
    }

    const imagePath = path.join(SUPPLIER_DIR, path.basename(image));

    if (!fs.existsSync(imagePath)) {
      return res.status(404).json({ connect: false, error: "Image not found!" });
    }

    fs.unlinkSync(imagePath);

    return res.status(200).json({ connect: true, message: "Image deleted successfully." });
  } catch (error) {
    console.error("Remove image error:", error);
    return res
      .status(500)
      .json({ connect: false, error: "Error occurred while deleting image" });
  }
};

module.exports = { uploadSuppliers, handleSupplierUpload, deleteImageFile, removeImage };