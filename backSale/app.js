const express = require("express");
const path = require("path");
const app = express();

const morgan = require("morgan");
app.use(morgan("dev"));

const cors = require("cors");
app.use(cors());
app.use(express.json());



// ---------- serve uploaded images
app.use("/uploadsSuppliers", express.static(path.join(__dirname, "public/uploadsSuppliers")));
app.use("/uploadsEmployees", express.static(path.join(__dirname, "public/uploadsEmployees")));
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));
app.use("/uploadsWebsite", express.static(path.join(__dirname, "public/uploadsWebsite"))); 
app.use("/uploadsStock", express.static(path.join(__dirname, "public/uploadsStock")));

// <-- was missing: website product images


const ProductRouter = require("./routes/Product.routes");
const WebRouter = require("./routes/Web.routes");
const SupplierRouter = require("./routes/suppliers.routes");
const EmployeeRouter = require("./routes/Employees.Routes");

const StockRouter = require(".//routes/Stock.routes")
const setCategory = require("./routes/SetCategory.routes");
const setProductCode = require("./routes/setProductCodes.routes")


//  testing controller 

const TestRouter = require("./routes/Test.routes")


app.use("/api/products", ProductRouter);
app.use("/api/web", WebRouter);
app.use("/api/suppliers", SupplierRouter);
app.use("/api/employees", EmployeeRouter);
app.use("/api/setproductcode",setProductCode)
app.use("/api/stocks", StockRouter);
app.use("/api/category", setCategory);


// testing router 

app.use("/api/test",TestRouter)

// ---------- 404 + error handler (must stay last)
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ success: false, message: err.message || "Server error" });
});

module.exports = app;