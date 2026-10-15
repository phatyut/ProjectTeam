const express = require("express");
const SupplierRouter = express.Router();

// adjust these two paths to your real file names (same style as your Employee router)
const {
  getAll,
  getById,
  create,
  update,
  remove,
} = require("../controller/suppliercontroller/Supplier.controller");
const { uploadSuppliers } = require("../middleware/uploadSuppliers.middleware");

// GET all / CREATE
SupplierRouter
  .route("/")
  .get(getAll)
  .post(uploadSuppliers.single("image"), create);

// GET / UPDATE / DELETE one supplier
SupplierRouter
  .route("/:id")
  .get(getById)
  .put(uploadSuppliers.single("image"), update)
  .delete(remove);

module.exports = SupplierRouter;