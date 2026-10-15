const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folderPath = path.join(
      __dirname,
      "../public/uploadsEmployees"
    );

    fs.mkdirSync(folderPath, { recursive: true });

    cb(null, folderPath);
  },

  filename: (req, file, cb) => {
    const extName = path.extname(file.originalname);

    const filename =
      Date.now() + extName;

    cb(null, filename);
  },
});

const fileFilter = (req, file, cb) => {
  const allowType = [
    "image/png",
    "image/gif",
    "image/jpeg",
  ];

  if (allowType.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error("Only PNG, GIF, JPEG are allowed"),
      false
    );
  }
};

const uploadsEmployees = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});


// ================================
// REMOVE EMPLOYEE IMAGE
// ================================

const removeImage = (req, res) => {
  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({
        connect: false,
        error: "Image is required",
      });
    }

    const imageName = path.basename(image);

    const imagePath = path.join(
      __dirname,
      "../public/uploadsEmployees",
      imageName
    );

    if (!fs.existsSync(imagePath)) {
      return res.status(404).json({
        connect: false,
        error: "Image not found!",
      });
    }

    fs.unlinkSync(imagePath);

    return res.status(200).json({
      connect: true,
      message: "Image deleted successfully.",
    });

  } catch (error) {
    console.error("Remove image error:", error);

    return res.status(500).json({
      connect: false,
      error: "Error occurred while deleting image",
    });
  }
};


module.exports = {
  uploadsEmployees,
  removeImage,
};