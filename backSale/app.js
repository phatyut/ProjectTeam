const express = require("express");
const app = express();


const morgan = require("morgan");
app.use(morgan("dev"))

const cors = require("cors")
app.use(cors());
app.use(express.json())




app.use("/uploads", express.static("public/uploads"));

const ProductRouter = require("./routes/Product.routes");
const WebRouter = require("./routes/Web.routes");
const SupplierRouter = require("./routes/suppliers.routes");

app.use("/api/products",ProductRouter);
app.use("/api/web",WebRouter);
app.use("/api/suppliers", SupplierRouter);
module.exports = app;