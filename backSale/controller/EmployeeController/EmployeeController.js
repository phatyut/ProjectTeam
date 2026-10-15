const fs = require("fs");
const path = require("path");
const EmployeesModel = require("../../model/Employee.model");


// ==========================================
// GET ALL
// ==========================================

const getAll = async (req, res) => {
  try {

    const employees = await EmployeesModel.find();

    res.status(200).json({
      connect: true,
      data: employees,
    });

  } catch (error) {

    res.status(500).json({
      connect: false,
      message: error.message,
    });

  }
};


// ==========================================
// GET BY ID
// ==========================================

const getById = async (req, res) => {
  try {

    const employee =
      await EmployeesModel.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({
        connect: false,
        message: "Employee not found",
      });
    }

    res.status(200).json({
      connect: true,
      data: employee,
    });

  } catch (error) {

    res.status(500).json({
      connect: false,
      message: error.message,
    });

  }
};


// ==========================================
// CREATE
// ==========================================

const create = async (req, res) => {
  try {

    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const EmployeeData = {
      ...req.body,
    };

    // Save uploaded filename
    if (req.file) {
      EmployeeData.image = req.file.filename;
    }

    const employee =
      await EmployeesModel.create(EmployeeData);

    res.status(201).json({
      connect: true,
      message: "Employee created successfully",
      data: employee,
    });

  } catch (error) {

    console.error("Create employee error:", error);

    res.status(500).json({
      connect: false,
      message: error.message,
    });

  }
};


// ==========================================
// UPDATE
// ==========================================

const update = async (req, res) => {
  try {
    const employee = await EmployeesModel.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({
        connect: false,
        message: "Employee not found",
      });
    }

    // text fields
    employee.name = req.body.name ?? employee.name;
    employee.position = req.body.position ?? employee.position;
    employee.phone = req.body.phone ?? employee.phone;
    employee.age = req.body.age ?? employee.age;
    employee.salary = req.body.salary ?? employee.salary;
    employee.startWork = req.body.startWork ?? employee.startWork;
    employee.email = req.body.email ?? employee.email;
    employee.sex = req.body.sex ?? employee.sex;
    employee.role = req.body.role ?? employee.role;

    // password: only change it if a new one was typed
    if (req.body.password) {
      employee.password = req.body.password; // use the same hashing as create, if any
    }

    // image: only change it if a new file was uploaded
    if (req.file) {
      if (employee.image) {
        const oldPath = path.join(
          __dirname,
          "../../public/uploadsEmployees",
          employee.image
        );
        fs.unlink(oldPath, () => {});
      }
      employee.image = req.file.filename;
    }

    await employee.save();

    res.status(200).json({
      connect: true,
      message: "Employee updated successfully",
      data: employee,
    });
  } catch (error) {
    console.error("Update employee error:", error);
    res.status(500).json({
      connect: false,
      message: error.message,
    });
  }
};

// ==========================================
// DELETE
// ==========================================

const remove = async (req, res) => {
  try {

    const employee =
      await EmployeesModel.findByIdAndDelete(
        req.params.id
      );

    if (!employee) {
      return res.status(404).json({
        connect: false,
        message: "Employee not found",
      });
    }

    res.status(200).json({
      connect: true,
      message: "Employee deleted successfully.",
    });

  } catch (error) {

    res.status(500).json({
      connect: false,
      message: error.message,
    });

  }
};


module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};