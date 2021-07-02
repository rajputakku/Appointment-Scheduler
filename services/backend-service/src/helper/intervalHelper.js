require("dotenv").config();
const START_TIME = parseInt(process.env.INTERVAL_START_TIME);
const END_TIME = parseInt(process.env.INTERVAL_END_TIME);

let defaultIntervals = null;

const populateDefaultIntervals = () => {
  defaultIntervals = [];
  for (let start_time = START_TIME; start_time < END_TIME; start_time += 1) {
    defaultIntervals.push({
      start_time: `${String(start_time).padStart(2, "0")}:00`,
      end_time: `${String(start_time + 1).padStart(2, "0")}:00`,
      slots: [],
    });
  }
};

const intervalHelper = {
  getDefaultIntervals: () => {
    if (defaultIntervals == null) {
      populateDefaultIntervals();
    }
    return defaultIntervals;
  },
};

module.exports = intervalHelper;
