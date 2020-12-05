const express = require("express");

// const passport = require("passport");

// const jwt = require("jsonwebtoken");
// const passportConfig = require("../passport");

const { passportSecretOrKey } = require("../config/config");

const doctorRouter = express.Router();
const doctorCtrl = require("../controllers/Doctors");

// register or sign up endpoint
doctorRouter.post("/docSignup", doctorCtrl.doctorRegister);
doctorRouter.post("/docLogin", doctorCtrl.doctorLogin);

module.exports = doctorRouter;
