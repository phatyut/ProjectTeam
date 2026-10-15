const express = require("express");
const { getAll, create,remove,edit,getById } = require("../controller/StockController/Stock.controller");
const StockRouter = express.Router();
    StockRouter 
        .route("/")
        .get(getAll)
        .post(create)
    StockRouter
        .route("/:id")
        .get(getById)
        .put(edit)
        .delete(remove)
module.exports= StockRouter;