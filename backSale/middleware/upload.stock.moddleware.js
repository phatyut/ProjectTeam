const multer = require("multer");
const path = require("path");
const fs = require("fs");

const SUPPLIER_DIR = path.join(__dirname, "../public/uploadsStock");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    fs.mkdirSync(SUPPLIER_DIR, { recursive: true });
    cb(null, SUPPLIER_DIR);
  },
  filename: (req, file, cb) => {
    const extName = path.extname(file.originalname).toLowerCase();
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

const uploadStocks = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

const handleStock = (req, res, next) => {
  uploadStocks.single("image")(req, res, (err) => {
    if (!err) return next();
    const message =
      err.code === "LIMIT_FILE_SIZE" ? "Image must be 5 MB or smaller." : err.message;
    return res.status(400).json({ success: false, message });
  });
};

const deleteImageFile = (filename) => {
  if (!filename) return;
  const filePath = path.join(SUPPLIER_DIR, path.basename(filename));
  fs.unlink(filePath, () => {});
};

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
    return res.status(500).json({ connect: false, error: "Error occurred while deleting image" });
  }
};

module.exports = { uploadStocks, handleStock, deleteImageFile, removeImage };