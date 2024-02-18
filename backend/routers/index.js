// main router index.js

// ! modules
const router = require('express').Router();

// ? middlewares
const auth = require('./../middlewares/Auth');

// ? routers
const routerAuth = require('./Auth');
const routerUsers = require('./Users');
const routerChats = require('./Chats');
const routerNotFound = require('./NotFound');

// Authorization
router.use('/api/auth', routerAuth);

// protected routers

// Users
router.use('/api/users', auth.isUserAuthorized, routerUsers);

// Chats
router.use('/api/chats', auth.isUserAuthorized, routerChats);

// ? 404
router.use(routerNotFound);

module.exports = router;
