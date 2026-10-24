const Stock = require("../../model/Stocks.model");
const { deleteImageFile } = require("../../middleware/upload.stock.moddleware");

const PRODUCT_FIELDS = "name model salePrice image category productCode";

// take only the fields we allow from the form
const pickFields = (body) => {
  const data = {};
  ["product", "batchId", "location", "category", "status", "name"].forEach((k) => {
    if (body[k] !== undefined) data[k] = String(body[k]).trim();
  });
  ["salePrice", "quantity"].forEach((k) => {
    if (body[k] !== undefined && body[k] !== "") data[k] = Number(body[k]);
  });
  return data;
};

// GET /api/stocks
const getAll = async (req, res) => {
  try {
    const list = await Stock.find()
      .populate("product", PRODUCT_FIELDS)
      .sort({ createdAt: -1 });
    return res.status(200).json({ connect: true, message: "OK", data: list });
  } catch (error) {
    console.error("Stock getAll error:", error);
    return res.status(500).json({ connect: false, message: error.message });
  }
};

// GET /api/stocks/:id  (product left as a plain ID so the edit page keeps working)
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

// POST /api/stocks
const create = async (req, res) => {
  try {
    const data = pickFields(req.body);

    // the database stores the file name only
    if (req.file) data.image = req.file.filename;

    console.log("create stock -> file:", req.file?.filename || "(no picture)", "| body:", req.body);

    const item = await Stock.create(data);
    return res.status(201).json({ connect: true, message: "Stock added", data: item });
  } catch (error) {
    if (req.file) deleteImageFile(req.file.filename);
    console.error("Stock create error:", error);
    return res.status(400).json({ connect: false, message: error.message });
  }
};

// PUT /api/stocks/:id
const edit = async (req, res) => {
  try {
    const old = await Stock.findById(req.params.id);
    if (!old) {
      if (req.file) deleteImageFile(req.file.filename);
      return res.status(404).json({ connect: false, message: "Stock not found" });
    }

    const data = pickFields(req.body);
    if (req.file) data.image = req.file.filename;

    const item = await Stock.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });

    if (req.file) deleteImageFile(old.image);
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