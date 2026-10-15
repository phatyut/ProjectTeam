const mongoose = require("mongoose");

const SuppliersSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"name is required."]
    },
    businessName:{
        type:String,
        unique:true,
        required:[true,"BusinessName is required."]
    },
    address:{
        type:String,
        required:[true,"Address is required."]
    },
    contact:{
        type:String,
        unique:true,
        required:[true,"Contact is required."]
    },
    image:{
        type:String,
        default:""
    }
},{timestamps:true})

const SuppliersModel = mongoose.model("SupplersModel",SuppliersSchema);

module.exports = SuppliersModel;