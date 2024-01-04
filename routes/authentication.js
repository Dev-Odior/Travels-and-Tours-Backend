const express = require("express");
const Router = express.Router();

const { register, logOut, login } = require("../controllers/authController");

Router.route("/register").post(register);
Router.route("/logOut").get(logOut);
Router.route("/login").post(login);

module.exports = Router;
