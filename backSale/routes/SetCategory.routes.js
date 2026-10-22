
const express = require("express");
const categorySchema = express.Router();
const {getAll,update,remove,create} = require("../controller/setOptions/setCategory.controller");

categorySchema
        .route("/")
        .get(getAll)
        .post(create);
categorySchema
        .route("/:id")
        .put(update)
        .delete(remove);

module.exports = categorySchema;
