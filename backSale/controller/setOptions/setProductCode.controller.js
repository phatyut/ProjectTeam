const ProductCodeModel = require("../../model/SetOptionModel/setProductCode.model");

// helper: pick the right status code
const getStatus = (error) => {
  if (error.code === 11000) return 409;            // duplicate
  if (error.name === "ValidationError") return 400; // validation failed
  if (error.name === "CastError") return 400;       // bad id
  return 500;
};

// helper: pick a readable message
const getMessage = (error) => {
  if (error.code === 11000) {
    const field = Object.keys(error.keyPattern || {})[0] || "value";
    return `Duplicate ${field}. This already exists.`;
  }
  return error.message;
};

const getAll = async (req, res) => {
  try {
    const data = await ProductCodeModel.find().sort({ createdAt: -1 });
    res.status(200).json({
      connect: true,
      data: data,
    });
  } catch (error) {
    res.status(getStatus(error)).json({
      connect: false,
      error: getMessage(error),
    });
  }
};

const create = async (req, res) => {
  try {
    const createdata = await ProductCodeModel.create(req.body);
    res.status(201).json({
      connect: true,
      data: createdata,
    });
  } catch (error) {
    res.status(getStatus(error)).json({
      connect: false,
      error: getMessage(error),
    });
  }
};

const remove = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await ProductCodeModel.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        connect: false,
        error: "Product code not found.",
      });
    }

    res.status(200).json({
      connect: true,
      data: "Delete Successfully.",
    });
  } catch (error) {
    res.status(getStatus(error)).json({
      connect: false,
      error: getMessage(error),
    });
  }
};

const update = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await ProductCodeModel.findByIdAndUpdate(id, req.body, {
      runValidators: true,
      new: true,
    });

    if (!data) {
      return res.status(404).json({
        connect: false,
        error: "Product code not found.",
      });
    }

    res.status(200).json({
      connect: true,
      data: data,
    });
  } catch (error) {
    res.status(getStatus(error)).json({
      connect: false,
      error: getMessage(error),
    });
  }
};

module.exports = { getAll, update, remove, create };