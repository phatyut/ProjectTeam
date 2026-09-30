const {default:mongoose} = require("mongoose");
const ProductSchema = new mongoose.Schema({
    image:{
        type:String,
        required: [true, "image is required"],
    },
    productCode:String,
    name:{type:String,unique:true,required:[true,"name is required"]},
    model:String,
    category:{type:String,required:true},
    costPrice:{type:Number,required:true},
    salePrice:{type:Number,required:true},
    branch:String,
    // currentStock:{type:Number,default:0}
},{timestamps:true});

const ProductModel =mongoose.model("ProductModels",ProductSchema);
module.exports = ProductModel;