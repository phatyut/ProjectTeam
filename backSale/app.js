const express = require("express");
const app = express();


const morgan = require("morgan");
app.use(morgan("dev"))

const cors = require("cors")
app.use(cors());
app.use(express.json())




app.use("/uploads", express.static("public/uploads"));

const ProductRouter = require("./routes/Product.routes");
app.use("/api/products",ProductRouter);





const WebRouter = require("./routes/Web.routes");
app.use("/api/web",WebRouter)

module.exports = app;