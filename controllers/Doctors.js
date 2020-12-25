const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const { secretOrKey } = require("../config/config");
const Doctors = require("../models/Doctors");
const { getDate } = require("../middleware/utils");

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
      message: "Invalid Name Format",
    });
  }
  if (!passwordregex.test(password)) {
    return res.status(400).json({
      message:
        "Password should be 8 letters long and contain a Capital letter,number and special character",
    });
  }
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      message: "Invalid Email Format",
    });
  }
  // simple validation ends

  // check if doctor already exists
  Doctors.findOne({ email })
    .then((doctor) => {
      if (doctor) {
        return res.status(400).json({
          success: false,
          message: "Doctor's Email Account Already Exists",
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
          .then(() => {
            return res.status(201).json({
              success: true,
              message: "Account Created Successfully",
            });
          })
          .catch(() => {
            return res.status(400).json({
              success: false,
              message: "Account Not Created",
            });
          });
      });
    })
    .catch((err) => {
      console.log("error", err);
      return res.status(400).json({
        success: false,
        message: "Unable To Create Account, Try Again",
      });
    });
};
// const signToken = (userId) => {
//   return jwt.sign(
//     {
//       iss: "decoder",
//       sub: userId,
//     },
//     passportSecretOrKey,
//     { expiresIn: "1 day" }
//   );
// };

// exports.doctorLogin = (req, res) => {
//   if (req.isAunthenticated()) {
//     const { _id, email } = req.body;
//     const token = signToken(_id);
//     res.cookie("access_token", token, { httpOnly: true, sameSite: true });
//     res.status(200).json({
//       isAunthenticated: true,
//       doctor: email,
//     });
//   }
//   res.status(400).json({ error: "unable to login" });
// };

exports.doctorLogin = (req, res) => {
  const { email, password } = req.body;
  Doctors.findOne({ email })
    .then((doctor) => {
      if (!doctor) {
        return res.status(401).json({
          success: false,
          message: "Account with email doesn't exist",
        });
      }

      bcrypt.compare(password, doctor.password).then((valid) => {
        if (!valid) {
          return res.status(401).json({
            success: false,
            message: "Invalid Credentials",
          });
        }

        const token = jwt.sign({ userId: doctor }, secretOrKey, {
          expiresIn: "24h",
        });

        res
          .status(200)
          .json({
            userId: doctor._id,
            success: true,
            message: "Log in successful",
            token,
          })
          .catch((err) => {
            return res.status(500).json({
              success: false,
              message: err,
            });
          });
      });
    })
    .catch((err) => {
      return res.status(500).json({
        success: false,
        message: err,
      });
    });
};

exports.doctorUpdateProfile = (req, res) => {
  const { id } = req.params;
  const {
    firstName,
    lastName,
    email,

    specialization,
    unAvailableDays,
    availableTime,
    phone,
    about,
    services,
  } = req.body;

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  // do some basic validation
  if (firstName === "" && !firstName) {
    return res.status(400).json({
      message: "Invalid Name Format,Cannot be empty",
    });
  }
  if (lastName === "" && !lastName) {
    return res.status(400).json({
      message: "Invalid Name Format,Cannot be empty",
    });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      message: "Invalid Email Format",
    });
  }
  // simple validation ends

  Doctors.findByIdAndUpdate(
    id,
    {
      firstName,
      lastName,
      email,
      specialization,
      unAvailableDays,
      availableTime,
      phone,
      about,
      services,
    },
    { new: true }
  )
    .then(() => {
      return res.status(201).json({
        success: true,
        message: "Account has been updated succesfully",
      });
    })
    .catch((err) => {
      return res.status(500).json({
        success: false,
        message: err,
      });
    });
};
