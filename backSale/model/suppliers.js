import mongoose from "mongoose";

const SuppliersSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"name is required."]
    }

})

const SuppliersModel = mongoose.model("SupplersModel",SuppliersSchema);

module.exports = SuppliersModel;