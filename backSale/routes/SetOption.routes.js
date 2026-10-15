const express = require("express");
const { getAll, getOne,remove,edit,create } = require("../controller/setOptionController/setOption.controller");
const setOptionRouter = express.Router();

setOptionRouter
    .route("/")
    .get(getAll)
    .post(create)
setOptionRouter
    .route("/:id")
    .get(getOne)
    .put(edit)
    .delete(remove)


module.exports = setOptionRouter;