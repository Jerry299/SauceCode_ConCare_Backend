const express = require("express");
const helmet = require("helmet");

const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");

const dotenv = require("dotenv");
const { database } = require("./config/config");

dotenv.config();

// import routes
const doctorsRoutes = require("./routes/Doctors");
const patientRoutes = require("./routes/Patients");

// express middlewares
app.use(helmet());
app.use(morgan("dev"));
// adding express body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Connected to mongoDB Atlas successful");
  })
  .catch((err) => {
    console.log("Unable to connect to mongoDb Atlas");
    console.error(err);
  });

// endpoints
app.use("/api/auth", doctorsRoutes);
app.use("/api/auth", patientRoutes);

// initiate port and app listen
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running at PORT ${port}`);
});
