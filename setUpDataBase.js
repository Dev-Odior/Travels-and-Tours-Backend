const mongoose = require("mongoose");
const Config = require("./config");

const logger = Config.logger("Connect DB");

const connectDB = (url) => {
  try {
    mongoose.connect(url);
    logger.info("Successfully Connected to Database");
  } catch (error) {
    logger.error("Failed to connect to the database");
  }
};

module.exports = connectDB;
