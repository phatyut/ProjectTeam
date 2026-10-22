const {default:mongoose} = require("mongoose")


const testSchema  = new mongoose.Schema({
    name:{
        type:String ,
        required:[true,"name is required"]
    }
},{timestamps:true})


const testModel = mongoose.model("testModel",testSchema);

module.exports = testModel;