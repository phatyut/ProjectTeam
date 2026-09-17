const express = require("express");
const WebRouter  = express.Router();
const {getAll,create,getById,remove,updateData} = require("../controller/web/web.controller")

     WebRouter
               .route("/")
               .get(getAll)
               .post(create);
     WebRouter
               .route("/:id")
               .get(getById)
               .delete(remove)
               .put(updateData)


     module.exports  = WebRouter