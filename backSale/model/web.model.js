const { default: mongoose } = require("mongoose");

const webSchema = new mongoose.Schema({
    image:{
        type:String,
        required:[true,"image is required."]
    },
    title:{
        type:String,
        required:[true,"Title is required."]
    },
    cpu:{
        type:String,
        required:[true,"CPU is required."]
    },
    ram:{
        type:String,
        required:[true,"CPU is required."]
    },
    ssd:{
        type:Number,
        required:[true,"StorageOfSize is required."]
    },   
    model:{
        type:String,
        required:[true,"Model is required."]
    },
    brand:{
        type:String,
        required:[true,"name is required."]
    },
    salePrice:{
        type:Number,
        required:[true,"Price is required."]
    },
    deals:{
        type:Number,
        default:1
    },
    timeOfDeals:Date,
    description:{
        type:String
    }


},{timestamps:true})


const webModel = mongoose.model("WebModel",webSchema);

module.exports  = webModel