// main router index.js

// ! modules
const router = require('express').Router();

// ? middlewares
const auth = require('./../middlewares/Auth');
const lastTimeOnline = require('./../middlewares/LastTimeOnline');

// ? routers
const routerAuth = require('./Auth');
const routerUsers = require('./Users');
const routerChats = require('./Chats');
const routerNotFound = require('./NotFound');

// Authorization
router.use('/api/auth', routerAuth);

// protected routers

// Users
router.use(
  '/api/users',
  auth.isUserAuthorized,
  lastTimeOnline.updateTime,
  routerUsers,
);

// Chats
router.use(
  '/api/chats',
  auth.isUserAuthorized,
  lastTimeOnline.updateTime,
  routerChats,
);

// ? 404
router.use(routerNotFound);

module.exports = router;
