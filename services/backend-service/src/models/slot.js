const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const model = mongoose.model.bind(mongoose);

// this will contain any metadata for the slot..
const slotSchema = new Schema({
  name: String,
  email: String,
  phone: Number,
});

const Slot = model("Slot", slotSchema);
module.exports = Slot;
