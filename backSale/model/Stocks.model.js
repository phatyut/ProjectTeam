const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema(
  {
    image:    { type: String, default: "" },
    product:  { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "ProductModels", 
      required: [true, "Product reference is required"] 
    },
    batchId:  { type: String, required: [true, "BatchId is required"] },
    location: { type: String, required: [true, "Location is required"] },
    quantity: { type: Number, required: [true, "Quantity is required"], min: 0 },
    status:   { type: String, required: [true, "Status is required"] },
    
    // Cached Product fields saved from AddStock form:
    name:      { type: String },
    category:  { type: String },
    salePrice: { type: Number }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Stock", stockSchema);