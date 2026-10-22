const express = require("express");
const { getAll,remove,create,update } = require("../controller/setOptions/setProductCode.controller");
const setProductCode = express.Router();

setProductCode
    .route("/")
    .get(getAll)
    .post(create)
setProductCode
    .route("/:id")
    .put(update)
    .delete(remove)


module.exports = setProductCode;