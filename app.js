const express = require("express");
const helmet = require("helmet");

const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");

const { database } = require("./config/config");

// import routes
const doctorsRoutes = require("./routes/Doctors");

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
app.listen(5000, () => {
  console.log("Server is running at PORT 5000");
});
