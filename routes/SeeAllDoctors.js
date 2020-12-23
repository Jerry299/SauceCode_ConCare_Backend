const express = require("express");

const allDoctors = express.Router();

const getAllDoctors = require("../controllers/SeeAllDoctors");

allDoctors.get("/all_doctors", getAllDoctors.seeAllDoctors);

module.exports = allDoctors;
