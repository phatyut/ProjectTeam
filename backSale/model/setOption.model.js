const {default:mongoose} = require("mongoose");
const setOptionSchema =new mongoose.Schema({
    model:{type:String,unique:true},
    brand:{type:String,unique:true},
    category:{type:String,unique:true}
},{timestamps:true});
const setOption =mongoose.model("setOption",setOptionSchema);
module.exports = setOption

