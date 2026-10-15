const mongoose = require("mongoose");
const Web = require("../../model/web.model"); // your WebModel file
const { deleteImageFile } = require("../../middleware/uploadWeb.middleware"); // your upload file above
 
const TEXT_FIELDS = ["title", "cpu", "ram", "model", "brand", "description"];
const NUMBER_FIELDS = ["ssd", "salePrice", "deals"];
const DATE_FIELDS = ["timeOfDeals"];
 
// copy only the allowed fields from the form body
const pick = (body) => {
  const out = {};
  TEXT_FIELDS.forEach((key) => {
    if (body[key] !== undefined) out[key] = body[key];
  });
  NUMBER_FIELDS.forEach((key) => {
    if (body[key] === undefined) return;
    // an empty "deals" goes back to its default (1); empty ssd/salePrice fail validation on purpose
    out[key] = body[key] === "" && key === "deals" ? 1 : body[key];
  });
  DATE_FIELDS.forEach((key) => {
    if (body[key] === undefined) return;
    out[key] = body[key] === "" ? null : body[key]; // empty = no deal end date
  });
  return out;
};
 
// send the first validation message (e.g. "CPU is required.") instead of mongoose's long text
const fail = (res, err) => {
  if (err.name === "ValidationError") {
    const first = Object.values(err.errors)[0];
    return res.status(400).json({ connect: false, message: first?.message || err.message });
  }
  return res.status(500).json({ connect: false, message: err.message });
};
 
exports.getAll = async (req, res) => {
  try {
    const data = await Web.find().sort({ createdAt: -1 });
    res.json({ connect: true, data });
  } catch (err) {
    fail(res, err);
  }
};
 
exports.getOne = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ connect: false, message: "Invalid id" });
    }
    const data = await Web.findById(req.params.id);
    if (!data) return res.status(404).json({ connect: false, message: "Not found" });
    res.json({ connect: true, data });
  } catch (err) {
    fail(res, err);
  }
};
 
exports.create = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ connect: false, message: "Image is required" });
    }
    const data = await Web.create({ ...pick(req.body), image: req.file.filename });
    res.json({ connect: true, message: "Product added", data });
  } catch (err) {
    if (req.file) deleteImageFile(req.file.filename); // don't keep an orphan image
    fail(res, err);
  }
};
 
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      if (req.file) deleteImageFile(req.file.filename);
      return res.status(400).json({ connect: false, message: "Invalid id" });
    }
 
    const old = await Web.findById(id);
    if (!old) {
      if (req.file) deleteImageFile(req.file.filename);
      return res.status(404).json({ connect: false, message: "Not found" });
    }
 
    const changes = pick(req.body);
    if (req.file) changes.image = req.file.filename;
 
    const data = await Web.findByIdAndUpdate(id, changes, { new: true, runValidators: true });
 
    if (req.file) deleteImageFile(old.image); // remove the replaced image
    res.json({ connect: true, message: "Product updated", data });
  } catch (err) {
    if (req.file) deleteImageFile(req.file.filename);
    fail(res, err);
  }
};
 
exports.remove = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ connect: false, message: "Invalid id" });
    }
    const data = await Web.findByIdAndDelete(req.params.id);
    if (!data) return res.status(404).json({ connect: false, message: "Not found" });
 
    deleteImageFile(data.image);
    res.json({ connect: true, message: "Product deleted" });
  } catch (err) {
    fail(res, err);
  }
};
 