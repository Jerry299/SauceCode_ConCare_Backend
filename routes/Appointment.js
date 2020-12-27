const express = require("express");

const apptRouter = express.Router();

const apptCtrl = require("../controllers/Appointment");

apptRouter.get("/:id/allAppointment", apptCtrl.getAllAppointments);
apptRouter.post("/:id/createAppointment", apptCtrl.createNewAppointment);

module.exports = apptRouter;
