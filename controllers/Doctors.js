const bcrypt = require("bcrypt");
const Doctors = require("../models/Doctors");

const getDate = () => {
  const date = new Date();
  return date;
};

exports.doctorRegister = (req, res) => {
  // destructure request body first
  const {
    firstName,
    lastName,
    email,
    password,
    specialization,
    unAvailableDays,
    availableTime,
  } = req.body;

  //     Passwords must be
  //  * - At least 8 characters long, max length anything
  //  * - Include at least 1 lowercase letter
  //  * - 1 capital letter
  //  * - 1 number
  //  * - 1 special character => !@#$%^&*
  const passwordregex = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/;
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  // do some basic validation
  if (firstName === "" && !firstName) {
    return res.status(400).json({
      error: "Invalid Name Format",
    });
  }
  if (lastName === "" && !lastName) {
    return res.status(400).json({
      error: "Invalid Name Format",
    });
  }
  if (!passwordregex.test(password)) {
    return res.status(400).json({
      error:
        "Password should be 8 letters long and contain a Capital letter,number and special character",
    });
  }
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      error: "Invalid Email Format",
    });
  }
  // simple validation ends

  // check if doctor already exists
  Doctors.findOne({ email })
    .then((doctor) => {
      if (doctor) {
        return res.status(400).json({
          error: "Doctor Already Exists",
        });
      }

      // create a new doctor if doctor do not exist
      bcrypt.hash(password, 10).then((hash) => {
        const newDoctor = new Doctors({
          firstName,
          lastName,
          email,
          password: hash,
          specialization,
          availableTime,
          unAvailableDays,
          dateJoined: getDate(),
        });
        newDoctor
          .save()
          .then((doc) => {
            console.log(doc);
            return res.status(201).json({
              message: "Account Created Successfully",
            });
          })
          .catch(() => {
            return res.status(400).json({
              error: "Account Not Created",
            });
          });
      });
    })
    .catch((err) => {
      console.log("error", err);
      return res.status(400).json({
        error: "Unable To Create Account, Try Again",
      });
    });
};

exports.doctorLogin = (req, res) => {};
