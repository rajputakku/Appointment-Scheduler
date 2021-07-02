const cors = require('cors');
const express = require("express");
const json = require("body-parser").json;
const fetchAppointmentRouter = require("./routes/fetchAppointment");
const newAppointmentRouter = require("./routes/newAppointment");


const pathPrefix = "/api";

var app = express();
app.use(cors())
app.use(json());
app.use(pathPrefix, fetchAppointmentRouter);
app.use(pathPrefix, newAppointmentRouter);

// error handler
app.use(function (err, req, res, next) {
  console.error(err);
  res.status(500).send("Some error occurred !");
});

module.exports = app;
