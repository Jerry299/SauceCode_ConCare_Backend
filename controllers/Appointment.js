const Appointments = require("../models/Appointments");
const Patients = require("../models/Patients");

const { getDate } = require("../middleware/utils");

exports.getAllAppointments = (req, res) => {
  const { id } = req.params;
  Patients.findById(id)
    .populate("appointments")
    .then((result) => {
      return res.status(200).json({
        success: true,
        message: result,
      });
    })
    .catch(() => {
      return res.status(500).json({
        success: false,
        message: "Error,Cannot retrieve all appointments,try again",
      });
    });
};

// endpoint for patient to create a n appointment with a doctor
exports.createNewAppointment = (req, res) => {
  const { date } = req.body;
  const { id } = req.params;
  const newAppointment = new Appointments({
    appointmentCreatedAt: getDate(),
    timeForAppointment: date,
  });

  newAppointment
    .save()
    .then((appointment) => {
      Patients.findByIdAndUpdate(
        id,
        { $push: { appointments: appointment._id } },
        { new: true, useFindAndModify: false }
      )
        .then(() => {
          return res.status(200).json({
            success: true,
            message: "Appointment Booked successfully",
          });
        })
        .catch(() => {
          return res.status(400).json({
            success: false,
            message: "Appointment Failed ,Try Agin",
          });
        });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Server error,Appointment can not be created",
      });
    });
};
