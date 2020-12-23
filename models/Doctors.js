const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  unAvailableDays: {
    type: String,
    required: true,
  },
  availableTime: {
    type: String,
    required: true,
  },
  dateJoined: {
    type: String,
  },
  phone: {
    type: String,
  },
  about: {
    type: String,
  },
  services: {
    type: String,
  },
});

module.exports = mongoose.model("Doctors", doctorSchema);
