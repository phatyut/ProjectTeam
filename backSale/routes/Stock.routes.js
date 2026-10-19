
const express = require("express");

const { getAll, create, remove,edit, getById,} = require("../controller/StockController/Stock.controller");

const {  handleStock} = require("../middleware/upload.stock.moddleware");

const StockRouter = express.Router();

StockRouter
  .route("/")
  .get(getAll)
  .post(handleStock, create);

StockRouter
  .route("/:id")
  .get(getById)
  .put(handleStock, edit)
  .delete(remove);

module.exports = StockRouter;
