// router Auth.js

// ! modules
const routerAuth = require("express").Router();

// ? controllers
const authController = require("./../controllers/Auth");

routerAuth.post("/login", authController.login);

routerAuth.post("/register", authController.register);

module.exports = routerAuth;
