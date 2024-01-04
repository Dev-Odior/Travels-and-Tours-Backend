const { StatusCodes } = require("http-status-codes");

//model
const USER = require("../schema/UserSchema");

//Error
const { BadRequestError, NotFoundError } = require("../error/customError");

const register = async (req, res, next) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    throw new BadRequestError("You did not provide complete credentials");
  }

  const verification = await USER.findOne({ email });

  if (verification) {
    throw new BadRequestError("User already exist");
  }

  const newUser = await USER.create(req.body);
  const token = await newUser.createJWT();
  res.status(StatusCodes.OK).json({ name: newUser.name, token });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("You did not provide complete credentials");
  }

  const verifiedUser = await USER.findOne({ email });

  if (!verifiedUser) {
    throw new NotFoundError("No account with this credentials");
  }

  const passwordCheck = await verifiedUser.comparePassword(password);

  if (!passwordCheck) {
    throw new BadRequestError("You password is not correct");
  }

  const token = await verifiedUser.createJWT();
  res.status(StatusCodes.OK).json({ name: verifiedUser.name, token });
};

const logOut = (req, res, next) => {
  res
    .status(StatusCodes.OK)
    .json({ logout: true, msg: "Logged Out Successfully" });
};

module.exports = { register, login, logOut };
