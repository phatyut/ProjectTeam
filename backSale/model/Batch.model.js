const mongoose = require("mongoose");
 
const BatchSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
  },
  { timestamps: true }
);
 
 const Batchs= mongoose.model("Batchs", BatchSchema);
module.exports = Batchs;