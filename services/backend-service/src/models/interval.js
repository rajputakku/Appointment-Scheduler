const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;
const model = mongoose.model.bind(mongoose);

const intervalSchema = new Schema({
  start_time: String,
  end_time: String,
  slots: { type: [ObjectId], ref: "Slot" },
});

const Interval = model("Interval", intervalSchema);
module.exports = Interval;
