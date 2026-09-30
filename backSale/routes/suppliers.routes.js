const express = require("express");
const SupplierRouter = express.Router();
const { getAll,findOne,create,remove,update } = require("../controller/suppliercontroller/Supplier.controller");

SupplierRouter
        .route("/")
        .get(getAll)
        .post(create);
SupplierRouter
        .route("/:id")
        .get(findOne)
        .delete(remove)
        .put(update)

module.exports = SupplierRouter;
