const express = require("express");
const AwaitLock = require("await-lock");
const intervalHelper = require("../helper/intervalHelper");
const dateHelper = require("../helper/dateHelper");
const Appointment = require("../models/appointment");
const Interval = require("../models/interval");
const Slot = require("../models/slot");

const router = express.Router();
const MAX_SLOTS_IN_INTERVAL = parseInt(process.env.MAX_SLOTS_IN_INTERVAL);
const appointmentBookingLock = new AwaitLock();

const validInterval = (start_time, end_time) => {
  const intervals = intervalHelper.getDefaultIntervals();
  for (let interval of intervals) {
    if (interval.start_time == start_time && interval.end_time == end_time) {
      return true;
    }
  }
  return false;
};

router.post("/appointment", async (req, res) => {
  const { start_time, end_time, name, email, phone } = req.body;
  const date = dateHelper.validateAndParseDate(req.body.date);
  if (!validInterval(start_time, end_time)) {
    res
      .status(400)
      .send(`Invalid start time: ${start_time} or end time: ${end_time}`);
  } else if (!date) {
    res.status(400).send(`Invalid date - ${req.body.date}`);
  } else {
    await appointmentBookingLock.acquireAsync(); // aquire lock
    try {
      let appointmentFromDB = await Appointment.findByDateWithInterval(
        date,
        start_time,
        end_time
      );

      if (!appointmentFromDB) {
        // create appointment
        appointmentFromDB = await Appointment.create({
          date: date,
          intervals: [],
        });
      }

      let intervalFromDB;
      if (appointmentFromDB.intervals.length) {
        intervalFromDB = appointmentFromDB.intervals[0];
      } else {
        // create interval
        intervalFromDB = await Interval.create({
          start_time: start_time,
          end_time: end_time,
          slots: [],
        });

        // save interval in appointment
        appointmentFromDB.intervals.push(intervalFromDB);
        await appointmentFromDB.save();
      }

      if (intervalFromDB.slots.length == MAX_SLOTS_IN_INTERVAL) {
        res
          .status(406)
          .send(
            `All slots for date ${date} from ${start_time} to ${end_time} are booked.`
          );
      } else {
        // create slot
        const slot = await Slot.create({
          name,
          phone,
          email,
        });

        intervalFromDB.slots.push(slot);
        await intervalFromDB.save();

        res.send(
          `Successfully booked appointment for date ${date} from ${start_time} to ${end_time}.`
        );
      }
    } catch (e) {
      console.log("Error creating new appointment: ", e);
      res.status(500).send("Some error occurred !");
    } finally {
      appointmentBookingLock.release(); // release lock
    }
  }
});

module.exports = router;
