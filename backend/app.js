// todo write a cool backend application

// ! modules
require("dotenv").config();
const express = require("express");
const jsonServer = require("json-server");
const morgan = require("morgan");

// ! init
const server = jsonServer.create();
const router = jsonServer.router("./databases/db.json");
const middlewares = jsonServer.defaults();

// ? controllers
const { login, register } = require("./controllers/Auth");
// ? middlewares
const { authenticateToken } = require("./middlewares/Auth");
// ? utils
const { SERVER_SETTING } = require("./utils/constants");

//
server.use(express.json());
server.use(middlewares);
server.use(morgan("dev"));
server.use((req, res, next) => {
  // Middleware to disable CORS
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// ? routers
// login
server.post("/api/login", login);
// register
server.post("/api/register", register);
// all other routers
server.use("/api", authenticateToken, router);

server.listen(SERVER_SETTING.PORT, () => {
  console.log(`JSON Server is running at port ${SERVER_SETTING.PORT}`);
});
