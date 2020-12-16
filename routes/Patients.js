const express = require("express");

const patientRouter = express.Router();

// import controllers for patient
const patientCtrl = require("../controllers/Patients");

//  register or sign up endpoint
patientRouter.post("/patientRegister", patientCtrl.patientRegister);
patientRouter.post("/patientRegister", patientCtrl.patientLogin);

module.exports = patientRouter;
