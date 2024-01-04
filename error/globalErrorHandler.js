const { BadRequestError, CustomError } = require("./customError");
const { StatusCodes } = require("http-status-codes");

const globalErrorHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }

  console.log(err);

  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ msg: `Something went wrong on the server` });
};

module.exports = globalErrorHandler;
