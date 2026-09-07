const app = require("./app")

const dotenv = require("dotenv");
dotenv.config({path:"./dotenv/dotenv.env"});
const port = process.env.PORT;


const connectToDB = require("./database/db");
connectToDB()


app.listen(port,()=>{
    console.log("Server running on http://localhost:"+port)
})
