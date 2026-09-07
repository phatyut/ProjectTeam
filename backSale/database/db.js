const {default:mongoose} = require("mongoose");
const connectToDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_ULI);
        console.log("Server is Up")

    }catch(err){
        console.log(err)
    }
}



module.exports = connectToDB;