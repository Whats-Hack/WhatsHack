// router Chats.js

// ! modules
const routerChats = require('express').Router();

// ? controllers
const chatController = require('./../controllers/Chat');

// ? GET

// get all users chats
routerChats.get('/', chatController.getAllChats);

// get 1 users chat
routerChats.get('/:chatId', chatController.getChatById);

// get the messages after message with id from chat
routerChats.get(
  '/:chatId/:messageId',
  chatController.getTheLastMessagesInChatById,
);

// ? POST

// send message
routerChats.post('/', chatController.createChat);

// send message
routerChats.post('/:chatId', chatController.sendMessage);

// ? PATCH

// modify message
routerChats.patch('/:chatId/:messageId', chatController.modifyMessage);

module.exports = routerChats;
