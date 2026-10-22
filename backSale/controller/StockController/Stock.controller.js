const Stock = require("../../model/Stocks.model"); // <- change to the real path/name of your Stock model file
const { deleteImageFile } = require("../../middleware/upload.stock.moddleware"); // same file name as in your Stock.routes.js

// take only the fields we allow from the form
const pickFields = (body) => {
  const data = {};
  ["product", "batchId", "location", "category", "status"].forEach((k) => {
    if (body[k] !== undefined) data[k] = String(body[k]).trim();
  });
  ["price", "quantity"].forEach((k) => {
    if (body[k] !== undefined && body[k] !== "") data[k] = Number(body[k]);
  });
  return data;
};

// GET /api/stocks
const getAll = async (req, res) => {
  try {
    const list = await Stock.find().sort({ createdAt: -1 });
    return res.status(200).json({ connect: true, message: "OK", data: list });
  } catch (error) {
    console.error("Stock getAll error:", error);
    return res.status(500).json({ connect: false, message: error.message });
  }
};

// GET /api/stocks/:id
const getById = async (req, res) => {
  try {
    const item = await Stock.findById(req.params.id);
    if (!item) return res.status(404).json({ connect: false, message: "Stock not found" });
    return res.status(200).json({ connect: true, message: "OK", data: item });
  } catch (error) {
    console.error("Stock getById error:", error);
    return res.status(500).json({ connect: false, message: error.message });
  }
};

// POST /api/stocks   (route uses handleStock, so the picture is already saved by multer)
const create = async (req, res) => {
  try {
    const data = pickFields(req.body);

    // THIS is the line that makes the picture show in the list: the database stores the file name only
    if (req.file) data.image = req.file.filename;

    console.log("create stock -> file:", req.file?.filename || "(no picture)", "| body:", req.body);

    const item = await Stock.create(data);
    return res.status(201).json({ connect: true, message: "Stock added", data: item });
  } catch (error) {
    if (req.file) deleteImageFile(req.file.filename); // do not keep a picture when saving failed
    console.error("Stock create error:", error);
    return res.status(400).json({ connect: false, message: error.message });
  }
};

// PUT /api/stocks/:id   (route uses handleStock)
const edit = async (req, res) => {
  try {
    const old = await Stock.findById(req.params.id);
    if (!old) {
      if (req.file) deleteImageFile(req.file.filename);
      return res.status(404).json({ connect: false, message: "Stock not found" });
    }

    const data = pickFields(req.body);
    if (req.file) data.image = req.file.filename; // new picture chosen

    const item = await Stock.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });

    if (req.file) deleteImageFile(old.image); // delete the replaced picture
    return res.status(200).json({ connect: true, message: "Stock updated", data: item });
  } catch (error) {
    if (req.file) deleteImageFile(req.file.filename);
    console.error("Stock edit error:", error);
    return res.status(400).json({ connect: false, message: error.message });
  }
};

// DELETE /api/stocks/:id
const remove = async (req, res) => {
  try {
    const item = await Stock.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ connect: false, message: "Stock not found" });
    deleteImageFile(item.image);
    return res.status(200).json({ connect: true, message: "Stock deleted" });
  } catch (error) {
    console.error("Stock remove error:", error);
    return res.status(500).json({ connect: false, message: error.message });
  }
};

module.exports = { getAll, getById, create, edit, remove };