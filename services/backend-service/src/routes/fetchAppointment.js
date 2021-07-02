const express = require("express");
const intervalHelper = require("../helper/intervalHelper");
const dateHelper = require("../helper/dateHelper");
const Appointment = require("../models/appointment");
const router = express.Router();

// merges the default intervals and intervals from database
const mergeIntervals = (intervals_from_db, default_intervals) => {
  merged_intervals = [];
  index = 0;
  for (let interval of default_intervals) {
    if (
      index < intervals_from_db.length &&
      interval.start_time == intervals_from_db[index].start_time
    ) {
      merged_intervals.push(intervals_from_db[index]);
      index += 1;
    } else {
      merged_intervals.push(interval);
    }
  }
  return merged_intervals;
};

router.get("/appointment", async (req, res) => {
  const date = dateHelper.validateAndParseDate(req.query.date);
  if (!date) {
    res.status(400).send(`Invalid date - ${req.query.date}`);
  } else {
    const appointments = {
      date: date,
      intervals: intervalHelper.getDefaultIntervals(),
    };

    try {
      const appointmentFromDB = await Appointment.findByDate(date);
      if (appointmentFromDB && appointmentFromDB.intervals) {
        appointments.intervals = mergeIntervals(
          appointmentFromDB.intervals,
          appointments.intervals
        );
      }
      res.send({
        appointments: appointments,
      });
    } catch (e) {
      console.log("Error fetching appointment from db: ", e);
      res.status(500).send("Some error occurred !");
    }
  }
});

module.exports = router;
