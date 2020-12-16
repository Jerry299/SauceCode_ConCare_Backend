const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const { secretOrKey } = require("../config/config");
const Patients = require("../models/Patients");
const { getDate } = require("../middleware/utils");

exports.patientRegister = (req, res) => {
  // destructure requests body
  const { firstName, lastName, email, password } = req.body;

  //     Passwords must be
  //  * - At least 8 characters long, max length anything
  //  * - Include at least 1 lowercase letter
  //  * - 1 capital letter
  //  * - 1 number
  //  * - 1 special character => !@#$%^&*
  const passwordregex = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/;
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  // do simple validations
  if (firstName === "" && !firstName) {
    return res.status(400).json({
      error: "First Name can not be empty",
    });
  }

  if (lastName === "" && !lastName) {
    return res.status(400).json({
      error: "Last Name cannot be empty and must be valid",
    });
  }
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      error: "Invalid Email Format",
    });
  }
  if (!passwordregex.test(password)) {
    return res.status(400).json({
      error: "Invalid Password Format",
    });
  }

  // if validations passes,Check if patinets already exists
  Patients.findOne({ email })
    .then((patient) => {
      if (patient) {
        return res.status(400).json({
          error: "Email already exists!!",
        });
      }

      // if patient do not exist,create a new patient
      bcrypt
        .hash(password, 10)
        .then((hash) => {
          const newPatient = new Patients({
            firstName,
            lastName,
            email,
            password: hash,
            dateJoined: getDate(),
          });
          newPatient
            .save()
            .then(() => {
              return res.status(200).json({
                message: "Account created successfully",
              });
            })
            .catch(() => {
              return res.status(400).json({
                error: "Error while creating account,Please try again",
              });
            });
        })
        .catch(() => {
          return res.status(400).json({
            error: "Unable to create account,Please Try again",
          });
        });
    })
    .catch(() => {
      return res.status(500).json({
        error: "Server Error, Try again",
      });
    });
};

exports.patientLogin = (req, res) => {
  const { email, password } = req.body;
  Patients.findOne({ email })
    .then((patient) => {
      if (!patient) {
        return res.status(400).json({
          error: "Email do not exist",
        });
      }

      bcrypt
        .compare(password, patient.password)
        .then((valid) => {
          // check if password matches
          if (!valid) {
            return res.status(401).json({
              error: "Invalid Log In Credentials.",
            });
          }

          // if password matches, generate token for user

          const token = jwt.sign({ userId: patient }, secretOrKey, {
            expiresIn: "24h",
          });

          res.status(200).json({
            userId: patient._id,
            message: "Log in successful",
            token,
          });
        })
        .catch(() => {
          return res.status(404).json({
            error: "Cannot Log In,Try again later",
          });
        });
    })
    .catch(() => {
      return res.status(500).json({
        error: "Server Error,Try Again Later",
      });
    });
};
