const express = require("express");
const TestRouter = express.Router();
const {All,create,edit,remove} = require("../controller/testcontroller/TestController");

TestRouter.route("/")
          .get(All)
          .post(create)
TestRouter.route("/:id")
           .delete(remove)
           .put(edit)


module.exports = TestRouter;