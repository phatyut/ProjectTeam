const express = require("express");
const EmployeeRouter = express.Router();
const { getAll, getById, create, update, remove } = require("../controller/EmployeeController/EmployeeController");
const { uploadsEmployees } = require("../middleware/uploadEmployee.middleware");

// GET all / CREATE
EmployeeRouter
  .route("/")
  .get(getAll)
  .post(uploadsEmployees.single("image"), create);

// GET / UPDATE / DELETE one employee
EmployeeRouter
  .route("/:id")
  .get(getById)
  .put(uploadsEmployees.single("image"), update)
  .delete(remove);

module.exports = EmployeeRouter;