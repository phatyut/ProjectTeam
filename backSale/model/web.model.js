const { default: mongoose } = require("mongoose");

const webSchema = new mongoose.Schema({
    image:{
        type:String,
        required:[true,"image is required."]
    },
    names:{
        type:String,
        required:[true,"name is required."]
    },
    cpu:{
        type:String,
        required:[true,"CPU is required."]
    },
    typeOfRam:{
        type:String,
        required:[true,"typeOfRam is required."]
    },
    sizeOfRam:{
        type:String,
        required:[true,"SizeOfRam is required."]
    },
    costprice:{
        type:Number,
        required:[true,"Price is required."]
    },
    SalePrice:{
        type:Number,
        required:[true,"Price is required."]
    },
    storageofType:{
        type:String,
        required:[true,"StorageOfType is required."]
    },
    storageOfSize:{
        type:Number,
        required:[true,"StorageOfSize is required."]
    },
    batterySize:{
        type:Number,
        required:[true,"Batterysize is required."]
    },
    description:{
        type:String
    }


})


const webModel = mongoose.model("WebModel",webSchema);

module.exports  = webModel