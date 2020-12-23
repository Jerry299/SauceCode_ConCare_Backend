const Doctors = require("../models/Doctors");

exports.seeAllDoctors = (req, res) => {
  Doctors.find({})
    .then((doc) => {
      if (doc) {
        return res.status(200).json({
          message: doc,
        });
      }
    })
    .catch((error) => {
      console.log("error", error);
      return res.status(500).json({
        error: "Unable to display Doctors at the moment.",
      });
    });
};
