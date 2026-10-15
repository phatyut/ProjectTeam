const { default: mongoose } = require("mongoose");
 
const webSchema = new mongoose.Schema(
  {
    image: { type: String, required: [true, "Image is required."] },
    title: { type: String, required: [true, "Title is required."], trim: true },
    cpu: { type: String, required: [true, "CPU is required."], trim: true },
    ram: { type: String, required: [true, "RAM is required."] },
    ssd: { type: Number, required: [true, "Storage size is required."], min: 1 }, // size in GB (1TB = 1024)
    model: { type: String, required: [true, "Model is required."], trim: true },
    brand: { type: String, required: [true, "Brand is required."], trim: true },
    salePrice: { type: Number, required: [true, "Price is required."], min: 0 },
    deals: { type: Number, default: 1, min: 0 },
    timeOfDeals: { type: Date, default: null },
    description: { type: String, default: "" },
  },
  { timestamps: true }
);
 
const webModel = mongoose.model("WebModel", webSchema);
 
module.exports = webModel;
 