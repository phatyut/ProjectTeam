const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema(
  {
    image:    { type: String, default: "" },
    product:  { type: String, required: [true, "Product is required"] },
    batchId:  { type: String, required: [true, "BatchId is required"] },
    location: { type: String, required: [true, "Location is required"] },
    category: { type: String,},
    price:    { type: Number, required: [true, "Price is required"], min: 0 },
    quantity: { type: Number, required: [true, "Quantity is required"], min: 0 },
    status:   { type: String, required: [true, "Status is required"] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Stock", stockSchema);