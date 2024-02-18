// router NotFound.js

// ! modules
const routerNotFound = require('express').Router();

// ? controllers
const notFoundController = require('./../controllers/NotFound');

routerNotFound.use('*', notFoundController.notFound);

module.exports = routerNotFound;
