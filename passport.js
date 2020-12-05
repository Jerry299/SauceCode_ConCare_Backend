const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const bcrypt = require("bcrypt");
const Doctors = require("./models/Doctors");
const { passportSecretOrKey } = require("./config/config");

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies.access_token;
  }
  return token;
};

// middleware for authentication
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: passportSecretOrKey,
    },
    (jwtPayload, done) => {
      Doctors.findById({ _id: jwtPayload.sub }, (err, user) => {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      });
    }
  )
);

// middleware for authentication using email and passowrd
passport.use(
  new LocalStrategy(
    ({ userNameField: "email" },
    (email, password, done) => {
      Doctors.findOne({ email }, (err, doctor) => {
        // something went wrong with the database
        if (err) {
          return done(err);
        }
        // return err if no doctor has that email
        if (!doctor) {
          return done(null, false, {
            error: "Email/Account doesn't exist....",
          });
        }
        // else if doctor exists and nothing went wrong with database, match password
        bcrypt
          .compare(password, doctor.password)
          .then((user) => {
            if (!user) {
              return done(null, false, { error: "Invalid Credentials" });
            }
            return done(null, user);
          })
          .catch((error) => {
            console.log(error);
            return done(null, false, { error: "Incorrect Login Details" });
          });
      });
    })
  )
);
