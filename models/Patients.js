const mongoose = require("mongoose");

const patientSchema = mongoose.Schema({
  firstName: {
    required: true,
    type: String,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  dateJoined: {
    type: String,
  },
  favouriteDoctors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctors",
    },
  ],
});

module.exports = mongoose.model("Patients", patientSchema);
