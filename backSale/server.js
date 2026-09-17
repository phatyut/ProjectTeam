const app = require("./app")

const dotenv = require("dotenv");
dotenv.config({path:"./dotenv/dotenv.env"});
const port = process.env.PORT;


const connectToDB = require("./database/db");
connectToDB()

// -------Handle  Error ---------
app.use((err,req,res,next)=>{
    res.status(404).json({
        connect:false,
        err:process.env.DEVELOP_STATUS =='production' ? "Server error.":err.stack
    })
})


app.listen(port,()=>{
    console.log("Server running on http://localhost:"+port)
})
