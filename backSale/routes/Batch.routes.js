
const express = require("express");
const BatchRouter = express.Router();
const {getAll,update,remove,create} = require("../controller/batchsController/batch.controller");

BatchRouter
        .route("/")
        .get(getAll)
        .post(create);
BatchRouter
        .route("/:id")
        .put(update)
        .delete(remove);

module.exports = BatchRouter;
