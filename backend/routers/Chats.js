// router Chats.js

// ! modules
const routerChats = require("express").Router();

// ? controllers
const chatController = require("./../controllers/Chat");

// ? GET

// get all users chats
routerChats.get("/", chatController.getAllChats);

// get 1 users chat
routerChats.get("/:chatId", chatController.getChatById);

module.exports = routerChats;
