const mongoose = require("mongoose");

const appointmentsSChema = new mongoose.Schema({
  appointmentCreatedAt: {
    type: String,
  },
  timeForAppointment: {
    type: String,
    required: true,
  },
  dateForAppointment: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Appointments", appointmentsSChema);
