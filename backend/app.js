// todo write a cool backend application

// ! modules
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');

// ? routers
const router = require('./routers/index');

// ? utils
const { SERVER_SETTING } = require('./utils/constants');

// ! init
const server = express();

// CORS
server.use(
  cors({
    origin: '*',
    optionsSuccessStatus: 200,
  }),
);

// to have access to body in request "parsing json"
server.use(express.json());
// for cool dev comments in console
server.use(morgan('dev'));

// Middleware to disable CORS
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// ? routers
server.use(router);

// ? start server
server.listen(SERVER_SETTING.PORT, () => {
  console.log(`JSON Server is running at port ${SERVER_SETTING.PORT}`);
});
