const FavouriteDoctorsForPatients = require("../models/FavoriteDoctors");
const Patients = require("../models/Patients");

const favDoctors = (req, res) => {
  const { id } = req.params;
  console.log(typeof id, "============ id");
  Patients.find({ id })
    .then((found) => {
      if (!found) {
        return null;
      }
      return res.status(200).json({
        success: true,
        message: id,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({
        success: false,
        message: "Server Error, Try Again",
      });
    });
};

module.exports = favDoctors;
