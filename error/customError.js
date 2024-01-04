const { StatusCodes } = require("http-status-codes");

class CustomError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
  }
}

class BadRequestError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

class NotFoundError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

module.exports = { CustomError, BadRequestError, NotFoundError };
