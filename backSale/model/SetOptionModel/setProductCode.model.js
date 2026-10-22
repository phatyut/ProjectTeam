const mongoose = require("mongoose");

const ProductCodeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      uppercase: true,
      unique: true,
      maxlength: [3, "Name must be at most 3 characters"],
    },
  },
  { timestamps: true }
);

const ProductCodeModel = mongoose.model("ProductCodeModel", ProductCodeSchema);
module.exports = ProductCodeModel;