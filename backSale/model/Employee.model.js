const { default: mongoose } = require("mongoose");

const EmployeesSchema = new mongoose.Schema({

  name: {
    type: String,
    required: [true, "name is required"],
  },

  position: {
    type: String,
    required: [true, "position is required"],
  },

  phone: {
    type: String,
    required: [true, "phone is required"],
  },

  age: {
    type: Number,
    required: [true, "age is required"],
  },

  sex: {
    type: String,
    required: [true, "sex is required"],
  },

  salary: {
    type: Number,
    required: [true, "salary is required"],
  },

  role: {
    type: String,
    required: [true, "role is required"],
  },

  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
  },

  password: {
    type: String,
    required: [true, "password is required"],
  },

  startWork: {
    type: Date,
    required: [true, "startWork is required"],
  },

  // IMPORTANT
  image: {
    type: String,
    default: null,
  },

},{timestamps:true});

const EmployeesModel =
  mongoose.model(
    "EmployeesModels",
    EmployeesSchema
  );

module.exports = EmployeesModel;