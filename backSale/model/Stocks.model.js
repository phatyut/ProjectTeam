const {default:mongoose} = require("mongoose");
const stockShema =new mongoose.Schema({
    productCode: {
      type: String,
      required: true,
    },

    batchId: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 0,
    },

    categoryCode: {
      type: String,
      required: true,
    },

    statusOfStock: {
      type: String,
      required: true,
    },

},{timestamps:true})

const Stocks = mongoose.model("Stock",stockShema);


module.exports = Stocks