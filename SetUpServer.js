const express = require("express");
const app = express();
require("express-async-errors");

const globalErrorHandler = require("./error/globalErrorHandler");
const notFoundMiddleware = require("./middleware/notFound");
const connectDB = require("./setUpDataBase");

//routes
const authentication = require("./routes/authentication");

const Config = require("./config");

const logger = Config.logger("SetUpServer");

const hpp = require("hpp");
const helmet = require("helmet");
const cors = require("cors");

require("dotenv").config();

const PORT = process.env.PORT || 3000;
const URL = process.env.MONGO_URI;

class StartServer {
  start() {
    this.securityMiddleware();
    this.standardMiddleware();
    this.routes();
    this.errorHandler();
    this.setUpServer();
  }

  securityMiddleware() {
    app.use(cors());
    app.use(hpp());
    app.use(helmet());
  }

  standardMiddleware() {
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
  }

  routes() {
    app.use("/auth", authentication);
  }

  errorHandler() {
    app.use(globalErrorHandler);
    app.use("*", notFoundMiddleware);
  }

  setUpServer() {
    try {
      connectDB(URL);
      app.listen(PORT, () => {
        logger.info(`Server is listening at port ${PORT}`);
      });
    } catch {
      logger.error("Error connecting to the server");
    }
  }
}

const Server = new StartServer();
module.exports = Server;
