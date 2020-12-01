const express = require("express");

const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");

const { database } = require("./config/config");

app.use(morgan("dev"));

mongoose
  .connect(database, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to mongoDB Atlas successful");
  })
  .catch((err) => {
    console.log("Unable to connect to mongoDb Atlas");
    console.error(err);
  });

app.listen(5000, () => {
  console.log("Server is running at PORT 5000");
});
