const bcrypt = require("bcrypt");
const Doctors = require("../models/Doctors");

const doctorRegister = (req, res) => {
  // destructure request body first
  const {
    firstName,
    lastName,
    email,
    password,
    specialization,
    unAvailableDays,
    availableTime,
  } = req.body;

  // do some basic validation
  if()
};

module.exports = doctorRegister;
