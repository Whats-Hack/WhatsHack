// index.js

// ! modules
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const expressWs = require('express-ws');
const morgan = require('morgan');
const mongoose = require('mongoose');

// ? controllers
const AuthController = require('./controllers/Auth.controller');
const ChatController = require('./controllers/Chat.controller');
const InfoController = require('./controllers/Info.controller');
const MessageController = require('./controllers/Message.controller');
const UserController = require('./controllers/User.controller');

// ? error
const { NotFoundError, BadRequestError } = require('./errors/AllErrors');

// ? middlewares
const auth = require('./middlewares/auth.middlewares');

// ? models
const userSchema = require('./models/user.model');

// ? utils
const { SERVER_SETTING } = require('./utils/constants');

// ! init
const server = express();
expressWs(server);

// Create a new set to hold each clients socket connection
const connections = new Set();
let connectionsLength = 0;

// CORS
server.use(
  cors({
    origin: '*',
    optionsSuccessStatus: 200,
  }),
);

// for cool dev comments in console
server.use(morgan('dev'));

function updateConnectionsInfo(ws, result) {
  connections.forEach((obj) => {
    if (obj.ws === ws) {
      connections.delete(obj);
    }
  });

  connections.add({ ws: ws, _id: result._id });
}

async function mainHandler(ws, req, next) {
  // init controllers
  const authController = new AuthController({
    sendError: _sendError,
    sendInfoToUserById: _sendInfoToUserById,
    sendInfoToUsersOnline: _sendInfoToUsersOnline,
    updateConnectionsInfo: updateConnectionsInfo,
  });
  const userController = new UserController({
    sendError: _sendError,
    sendInfoToUserById: _sendInfoToUserById,
    sendInfoToUsersOnline: _sendInfoToUsersOnline,
    updateConnectionsInfo: updateConnectionsInfo,
  });
  const infoController = new InfoController({
    sendError: _sendError,
    sendInfoToUserById: _sendInfoToUserById,
    sendInfoToUsersOnline: _sendInfoToUsersOnline,
    updateConnectionsInfo: updateConnectionsInfo,
  });
  const chatController = new ChatController({
    sendError: _sendError,
    sendInfoToUserById: _sendInfoToUserById,
    sendInfoToUsersOnline: _sendInfoToUsersOnline,
    updateConnectionsInfo: updateConnectionsInfo,
  });
  const messageController = new MessageController({
    sendError: _sendError,
    sendInfoToUserById: _sendInfoToUserById,
    sendInfoToUsersOnline: _sendInfoToUsersOnline,
    updateConnectionsInfo: updateConnectionsInfo,
  });

  // ? functions

  // send error
  function _sendError(err) {
    console.error('WebSocket Error:', err);
    // Отправляем ошибку обратно клиенту через WebSocket
    ws.send(
      JSON.stringify({
        statusCode: err.statusCode,
        errorMessage: err.errorMessage,
      }),
    );
  }

  // send other online users information
  function _sendInfoToUsersOnline(data, options = { isActive: false }) {
    connections.forEach((obj) => {
      if (obj.ws !== ws) {
        if (options.isActive) {
          if (obj._id) obj.ws.send(JSON.stringify(data));
        } else {
          obj.ws.send(JSON.stringify(data));
        }
      }
    });
  }

  // send other users by id information
  function _sendInfoToUserById(data, options = { isActive: false }, usersId) {
    connections.forEach((obj) => {
      if (obj.ws !== ws && usersId.includes(String(obj._id))) {
        if (options.isActive) {
          if (obj._id) obj.ws.send(JSON.stringify(data));
        } else {
          obj.ws.send(JSON.stringify(data));
        }
      }
    });
  }

  //
  console.log('WebSocket connected');

  connections.add({ ws: ws });
  connectionsLength++;

  ws.on('message', async (msg) => {
    let data;

    try {
      data = await JSON.parse(msg);
    } catch (err) {
      return _sendError(new BadRequestError('Messages must be valid JSON'));
    }

    switch (data.type) {
      // ? all functionally with auth
      case 'auth':
        switch (data.action) {
          // ? login by data
          case 'login':
            await authController.login(data, req, ws);
            break;

          // ? login by token
          case 'loginByToken':
            await authController.loginByToken(data, req, ws);
            break;

          // ? register a new one user
          case 'signup':
            await authController.signup(data, req, ws);
            break;

          default:
            _sendError(
              new NotFoundError(
                `Not found this action [${data.action}] in action [${data.type}]`,
              ),
            );
            break;
        }
        break;

      // ? all functionally with info of all
      case 'info':
        switch (data.action) {
          // ? count of all users
          case 'count all users':
            await infoController.countAllUsers(data, req, ws);
            break;

          // ? count of online users
          case 'count online users':
            await infoController.countOnlineUsers(data, req, ws);
            break;

          default:
            _sendError(
              new NotFoundError(
                `Not found this action [${data.action}] in action [${data.type}]`,
              ),
            );
            break;
        }
        break;

      // ? all functionally with user
      case 'user':
        auth.isUserAuthorized(req, data.token, _sendError);

        switch (data.action) {
          // ? update user info
          case 'update':
            await userController.updateUserInfo(data, req, ws);
            break;

          // ? get current user info
          case 'get my info':
            await userController.getUserInfo(data, req, ws);
            break;

          // ? get user info by id
          case 'get user info':
            await userController.getUserInfoById(data, req, ws);
            break;

          default:
            _sendError(
              new NotFoundError(
                `Not found this action [${data.action}] in action [${data.type}]`,
              ),
            );
            break;
        }
        break;

      // ? all functionally with chat
      case 'chat':
        auth.isUserAuthorized(req, data.token, _sendError);

        switch (data.action) {
          // ? get chat info by id
          case 'get chat info by id':
            await chatController.getInfoById(data, req, ws);
            break;

          // ? create a new one chat with user/users by Id
          case 'create':
            await chatController.createOneChat(data, req, ws);
            break;

          default:
            _sendError(
              new NotFoundError(
                `Not found this action [${data.action}] in action [${data.type}]`,
              ),
            );
            break;
        }

        break;

      // ? all functionally with message
      case 'message':
        auth.isUserAuthorized(req, data.token, _sendError);

        switch (data.action) {
          // ? send a message in chat by id
          case 'create':
            await messageController.createOneMessage(data, req, ws);
            break;

          // ? change status of message
          case 'change status':
            await messageController.changeStatusOfMessageById(data, req, ws);
            break;

          // ? change status of message
          case 'change value':
            await messageController.changeValueOfMessageById(data, req, ws);
            break;

          // ? delete message
          case 'delete':
            await messageController.deleteMessageById(data, req, ws);
            break;

          default:
            _sendError(
              new NotFoundError(
                `Not found this action [${data.action}] in action [${data.type}]`,
              ),
            );
            break;
        }
        break;

      default:
        _sendError(new NotFoundError('Not found this type'));
        break;
    }
  });

  ws.on('close', async () => {
    console.log('WebSocket disconnected');

    connections.forEach(async (obj) => {
      if (obj.ws === ws) {
        if (obj._id)
          await userSchema
            .findByIdAndUpdate(
              obj._id,
              { isActive: false, lastConnectionDate: new Date() },
              { new: true },
            )
            .then((result) => {
              _sendInfoToUsersOnline({
                type: 'user',
                action: 'logout',
                userId: result._id,
              });
            });

        connections.delete(obj);
      }
    });

    connectionsLength--;
  });
}

server.ws('/websocket', mainHandler);

server.use(express.json());

// ? start server
server.listen(SERVER_SETTING.PORT, async () => {
  await mongoose.connect('mongodb://localhost:27017/whatshack');
  console.log('Connecting to MongoDB');
  console.log(`Server is running at port ${SERVER_SETTING.PORT}`);
});
