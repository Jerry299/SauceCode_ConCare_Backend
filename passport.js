const passport = require("passport");
const { LocalStrategy } = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const Doctors = require("./models/Doctors");

passport.use(
  new LocalStrategy(({ userNameField: email }, password, done) => {
    Doctors.findOne({ email }, (err, doctor) => {
      // something went wrong with the database
      if (err) {
        return done(err);
      }
      // return err if no doctor has that email
      if (!doctor) {
        return done(null, false, { error: "Doctor doesn't exist...." });
      }
      // else if doctor exists and nothing went wrong with database
      bcrypt
        .compare(password, doctor.password)
        .then((user) => {
          if (!user) {
            return done(null, false, { error: "Invalid Credentials" });
          }
        })
        .catch();
    });
  })
);
