// router Users.js

// ! modules
const routerUsers = require('express').Router();

// ? controllers
const userController = require('./../controllers/User');

// ? GET

// get all users
routerUsers.get('/', userController.getAllUsers);

// get info about current user
routerUsers.get('/me', userController.getUserByToken);

// get just 1 user
routerUsers.get('/:userId', userController.getUserById);

module.exports = routerUsers;
