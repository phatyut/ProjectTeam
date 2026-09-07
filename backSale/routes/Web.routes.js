const express = require("express");
const WebRouter  = express.Router();
const {getAll} = require("../controller/web/web.controller")

     WebRouter.route("/").get(getAll);


     module.exports  = WebRouter