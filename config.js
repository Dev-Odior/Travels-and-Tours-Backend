const bunyan = require("bunyan");

require("dotenv").config();

class Config {
  constructor() {
    this.PORT = process.env.PORT;
    this.MONGO_URL = process.env.MONGO_URI;
    this.JWT_SECRET = process.env.JWT_SECRET;
    this.JWT_LIFETIME = process.env.JWT_LIFETIME;
  }

  logger(name) {
    return bunyan.createLogger({ name, level: "debug" });
  }

  start() {
    for (const [key, value] of Object.entries(this)) {
      if (value === undefined) {
        throw new Error(`Key ${key} has a value of ${value}`);
      }
    }
  }
}

const AppConfig = new Config();
module.exports = AppConfig;
