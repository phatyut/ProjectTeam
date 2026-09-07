const express = require("express");
const  {upload,removeImage} = require("../middleware/upload.middleware")
const {getAll,getOne,create,edit,remove}= require("../controller/productcontroller/Product.controller")
const ProductRouter = express.Router();
ProductRouter
    .route("/")
    .get(getAll)
    .post(upload.single("image"),create)

ProductRouter.delete("/image", removeImage)

ProductRouter
    .route("/:id")
    .get(getOne)
    .put(upload.single("image"),edit)
    .delete(remove)



module.exports = ProductRouter;