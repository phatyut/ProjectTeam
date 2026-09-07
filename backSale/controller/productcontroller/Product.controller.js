const ProductModel = require("../../model/Product.model");

// GET ALL
const getAll = async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.status(200).json({ connect: true, data: products });
  } catch (error) {
    res.status(400).json({ connect: false, error: error.message });
  }
};

// GET ONE
const getOne = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await ProductModel.findById(id);
    res.status(200).json({ connect: true, data: product });
  } catch (error) {
    res.status(400).json({ connect: false, error: error.message });
  }
};

// CREATE with image
const create = async (req, res) => {
  try {
    const productData = req.body;
    if (req.file) {
      productData.image = req.file.filename; // save filename in DB
    }
    const newProduct = await ProductModel.create(productData);
    res.status(200).json({ connect: true, data: newProduct });
  } catch (error) {
    res.status(400).json({ connect: false, error: error.message });
  }
};

// EDIT with image update
const edit = async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;
    if (req.file) {
      updateData.image = req.file.filename;
    }
    await ProductModel.findByIdAndUpdate(id, updateData, { runValidators: true, new: true });
    res.status(200).json({ connect: true, data: "update successfully" });
  } catch (error) {
    res.status(400).json({ connect: false, error: error.message });
  }
};

// DELETE
const remove = async (req, res) => {
  try {
    const id = req.params.id;
    await ProductModel.findByIdAndDelete(id);
    res.json({ connect: true, message: "delete successfully" });
  } catch (error) {
    res.status(400).json({ connect: false, error: error.message });
  }
};

module.exports = { getAll, getOne, create, edit, remove };
