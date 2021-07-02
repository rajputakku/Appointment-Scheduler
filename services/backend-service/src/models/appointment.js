const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;
const model = mongoose.model.bind(mongoose);

const appointmentSchema = new Schema({
  date: String,
  intervals: { type: [ObjectId], ref: "Interval" },
});

appointmentSchema.statics.findByDate = (date) => {
  return Appointment.findOne({
    date: date,
  }).populate({
    path: "intervals",
    select: "-_id -__v",
    options: { sort: { start_time: 1 } },
    populate: {
      path: "slots",
      select: "-_id -__v",
    },
  });
};

appointmentSchema.statics.findByDateWithInterval = (
  date,
  start_time,
  end_time
) => {
  return Appointment.findOne({
    date: date,
  }).populate({
    path: "intervals",
    match: { start_time, end_time },
  });
};

const Appointment = model("Appointment", appointmentSchema);

module.exports = Appointment;
