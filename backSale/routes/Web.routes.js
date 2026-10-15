const express = require("express");
const router = express.Router();
const WebController = require("../controller/web/web.controller");
const { handleSupplierUpload } = require("../middleware/uploadWeb.middleware"); // your upload file above
 
router.route("/").get(WebController.getAll).post(handleSupplierUpload, WebController.create);
 
router
  .route("/:id")
  .get(WebController.getOne)
  .put(handleSupplierUpload, WebController.update)
  .delete(WebController.remove);
 
module.exports = router;
 