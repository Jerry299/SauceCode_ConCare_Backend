const express = require("express");

const favoriteDoctors = express.Router();
const favDoctors = require("../controllers/ChooseFavoriteDoctors");

favoriteDoctors.get("/patients/mydoctors/:id", favDoctors);
favoriteDoctors.post("/patients/mydoctors/:id", favDoctors);

module.exports = favoriteDoctors;

// {"_id":{"$oid":"5fe5c3db41719219c8f6c564"}
