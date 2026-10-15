const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const SuppliersModel = require("../../model/suppliers.model"); // adjust to your real model file name

const EDITABLE_FIELDS = ["name", "businessName", "address", "contact"];
const SORTABLE_FIELDS = ["createdAt", "name", "businessName"];

// ==========================================
// HELPERS
// ==========================================

const IMAGE_DIR = path.join(__dirname, "../../public/uploadsSuppliers");

// delete one saved image by filename (does nothing if missing)
const deleteImageFile = (filename) => {
  if (!filename) return;
  fs.unlink(path.join(IMAGE_DIR, path.basename(filename)), () => {});
};

const clean = (value) => (typeof value === "string" ? value.trim() : value);

// makes user text safe inside a RegExp
const escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// one place for error responses
const sendError = (res, error, label) => {
  if (error.code === 11000) {
    return res.status(409).json({
      connect: false,
      message: "Business name or contact already exists.",
    });
  }

  if (error.name === "ValidationError") {
    return res.status(400).json({
      connect: false,
      message: Object.values(error.errors)[0].message,
    });
  }

  if (error.name === "CastError") {
    return res.status(400).json({ connect: false, message: "Invalid supplier id" });
  }

  console.error(label, error);
  return res.status(500).json({ connect: false, message: error.message });
};

// ==========================================
// GET ALL (search + filter + sort + pagination)
// GET /api/suppliers?page=1&limit=10&search=green&hasImage=true&sortBy=name&order=asc
// GET /api/suppliers?all=true  -> everything, no pagination (for dropdowns)
// ==========================================

const getAll = async (req, res) => {
  try {
    const search = String(req.query.search || "").trim();
    const { hasImage, all } = req.query;

    // ----- conditions
    const filter = {};

    if (search) {
      const regex = new RegExp(escapeRegex(search), "i");
      filter.$or = [
        { name: regex },
        { businessName: regex },
        { contact: regex },
        { address: regex },
      ];
    }

    if (hasImage === "true") filter.image = { $nin: ["", null] };
    if (hasImage === "false") filter.image = { $in: ["", null] };

    // ----- sorting
    const sortBy = SORTABLE_FIELDS.includes(req.query.sortBy) ? req.query.sortBy : "createdAt";
    const direction = req.query.order === "asc" ? 1 : -1;
    const sort = { [sortBy]: direction, _id: direction };

    // ----- no pagination
    if (all === "true") {
      const suppliers = await SuppliersModel.find(filter)
        .sort(sort)
        .collation({ locale: "en", strength: 2 });

      return res.status(200).json({ connect: true, data: suppliers });
    }

    // ----- pagination
    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 10, 1), 100);
    const requestedPage = Math.max(parseInt(req.query.page, 10) || 1, 1);

    const total = await SuppliersModel.countDocuments(filter);
    const totalPages = Math.max(Math.ceil(total / limit), 1);
    const page = Math.min(requestedPage, totalPages);

    const suppliers = await SuppliersModel.find(filter)
      .sort(sort)
      .collation({ locale: "en", strength: 2 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      connect: true,
      data: suppliers,
      pagination: {
        total,
        page,
        limit,
        totalPages,
        hasPrev: page > 1,
        hasNext: page < totalPages,
      },
    });
  } catch (error) {
    sendError(res, error, "Get suppliers error:");
  }
};

// ==========================================
// GET BY ID
// ==========================================

const getById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ connect: false, message: "Invalid supplier id" });
    }

    const supplier = await SuppliersModel.findById(req.params.id);

    if (!supplier) {
      return res.status(404).json({ connect: false, message: "Supplier not found" });
    }

    res.status(200).json({ connect: true, data: supplier });
  } catch (error) {
    sendError(res, error, "Get supplier error:");
  }
};

// ==========================================
// CREATE
// ==========================================

const create = async (req, res) => {
  try {
    console.log("BODY:", req.body); // remove these two logs when everything works
    console.log("FILE:", req.file);

    const { name, businessName, address, contact } = req.body;

    const supplier = await SuppliersModel.create({
      name: clean(name),
      businessName: clean(businessName),
      address: clean(address),
      contact: clean(contact),
      image: req.file ? req.file.filename : "",
    });

    res.status(201).json({
      connect: true,
      message: "Supplier created successfully",
      data: supplier,
    });
  } catch (error) {
    // the record failed, so remove the image multer already saved
    if (req.file) deleteImageFile(req.file.filename);
    sendError(res, error, "Create supplier error:");
  }
};

// ==========================================
// UPDATE
// ==========================================

const update = async (req, res) => {
  const newImage = req.file ? req.file.filename : null;

  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      if (newImage) deleteImageFile(newImage);
      return res.status(400).json({ connect: false, message: "Invalid supplier id" });
    }

    const supplier = await SuppliersModel.findById(req.params.id);

    if (!supplier) {
      if (newImage) deleteImageFile(newImage);
      return res.status(404).json({ connect: false, message: "Supplier not found" });
    }

    // text fields: only change what was sent
    EDITABLE_FIELDS.forEach((field) => {
      if (req.body[field] !== undefined) supplier[field] = clean(req.body[field]);
    });

    const oldImage = supplier.image;

    if (newImage) {
      supplier.image = newImage; // new photo uploaded
    } else if (req.body.removeImage === "true") {
      supplier.image = ""; // user removed the photo
    }

    await supplier.save();

    // save worked, so the old file is no longer needed
    if (oldImage && oldImage !== supplier.image) deleteImageFile(oldImage);

    res.status(200).json({
      connect: true,
      message: "Supplier updated successfully",
      data: supplier,
    });
  } catch (error) {
    // save failed, so throw away the new file and keep the old one
    if (newImage) deleteImageFile(newImage);
    sendError(res, error, "Update supplier error:");
  }
};

// ==========================================
// DELETE
// ==========================================

const remove = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ connect: false, message: "Invalid supplier id" });
    }

    const supplier = await SuppliersModel.findByIdAndDelete(req.params.id);

    if (!supplier) {
      return res.status(404).json({ connect: false, message: "Supplier not found" });
    }

    deleteImageFile(supplier.image); // also remove the photo from disk

    res.status(200).json({ connect: true, message: "Supplier deleted successfully." });
  } catch (error) {
    sendError(res, error, "Delete supplier error:");
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};