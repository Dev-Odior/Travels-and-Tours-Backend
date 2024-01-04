const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const logger = require("../config").logger("User Schema");
const config = require("../config");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    minLength: [3, "Name must be at least 3 characters long "],
  },
  email: {
    type: String,
    validate: {
      validator: validator.isEmail,
      message: "Invalid Email Format",
    },
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minLength: [5, "Password cannot be less than 5 characters"],
  },
});

UserSchema.pre("save", async function (next) {
  const user = this;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    next();
  } catch (error) {
    logger.error("Failed to hash Password");
    next(error);
  }
});

UserSchema.methods.createJWT = async function () {
  return JWT.sign({ userId: this._id, name: this.name }, config.JWT_SECRET, {
    expiresIn: config.JWT_LIFETIME,
  });
};

UserSchema.methods.comparePassword = async function (userPassword) {
  const isMatch = await bcrypt.compare(userPassword, this.password);
  return isMatch;
};

const model = mongoose.model("User", UserSchema);
module.exports = model;
