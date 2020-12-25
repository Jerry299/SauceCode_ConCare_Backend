const mongoose = require("mongoose");

const appointmentsSChema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patients",
  },
  doctorsId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctors",
  },
});

module.exports = mongoose.model("Appointments", appointmentsSChema);
