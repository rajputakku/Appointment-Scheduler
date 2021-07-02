require("./models/slot");
require("./models/interval");
require("./models/appointment");
require("dotenv").config();
const app = require("./app");
const mongoose = require("mongoose");

const start = async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // start express server on port 3000
  app.listen(3000, () => {
    console.log("Server started on port 3000");
  });
};

start();
