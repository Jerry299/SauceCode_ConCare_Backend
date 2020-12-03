const express = require("express");

const router = express.Router();
const doctorCtrl = require("../controllers/Doctors");
// register or sign up endpoint
router.post("/signup", doctorCtrl.doctorRegister);

module.exports = router;
