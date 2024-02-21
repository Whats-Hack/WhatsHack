// controller Chat.js

// ! modules
const fs = require('fs');

// controller
const userController = require('./User');

// ? utils
const { DB } = require('./../utils/constants');
const { writeFile } = require('./../utils/db');

class ChatController {
  constructor({ db }) {
    this._db = {
      users: db.users,
      chats: db.chats,
    };

    this.createChat = this.createChat.bind(this);
    this.getAllChats = this.getAllChats.bind(this);
    this.getChatById = this.getChatById.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.modifyMessage = this.modifyMessage.bind(this);
    this._findChatById = this._findChatById.bind(this);
    this._findMessageByIdInChat = this._findMessageByIdInChat.bind(this);
    this.getTheLastMessagesInChatById =
      this.getTheLastMessagesInChatById.bind(this);
  }

  /*** find chat by id
   * @params id - id of chat
   * @returns null or chat
   */
  _findChatById(id) {
    for (let i = 0; i < this._db.chats.length; i++) {
      const _chat = this._db.chats[i];
      if (_chat.id === id) {
        return { data: _chat, index: i };
      }
    }

    return null;
  }

  /*** find message in chat by id
   * @params id - id of message
   * @params chat - id of chat
   * @returns null or { data: message, index: index}
   */
  _findMessageByIdInChat(chat, id) {
    for (let i = 0; i < chat.messages.length; i++) {
      const _message = chat.messages[i];
      if (_message.id === id) {
        return { data: _message, index: i };
      }
    }

    return null;
  }

  // ? GET

  // return all users chats
  getAllChats(req, res, next) {
    const user = { ...userController._findUserById(req.user.id) };

    const chats = user.data.chats.map((chatId) => {
      const _chat = { ...this._findChatById(chatId).data };

      const _message =
        _chat.messages.length > 0
          ? _chat.messages[_chat.messages.length - 1]
          : undefined;

      if (_chat.messages.length > 0) {
        delete _chat.messages;
        _chat.messages = [_message];
      }

      return _chat;
    });

    res.send({
      data: chats,
    });
  }

  // return one chat by id
  getChatById(req, res, next) {
    const chatId = Number(req.params.chatId);

    const user = { ...userController._findUserById(req.user.id) };

    // valid
    if (!user.data.chats.includes(chatId)) {
      res.status(403);
      res.send({ error: "You don't have permission" });
      return;
    }

    const chat = this._findChatById(chatId).data;

    return res.send({ data: chat });
  }

  // return one last messages from chat by id
  getTheLastMessagesInChatById(req, res, next) {
    const chatId = Number(req.params.chatId);
    const messageId = Number(req.params.messageId);

    const user = { ...userController._findUserById(req.user.id) };

    // valid
    if (!user.data.chats.includes(chatId)) {
      res.status(403);
      res.send({ error: "You don't have permission" });
      return;
    }

    const chat = this._findChatById(chatId).data;

    const messages = chat.messages.filter((message) => message.id > messageId);

    return res.send({ data: messages });
  }

  // ? POST

  // create a new chat
  async createChat(req, res, next) {
    const { userId } = req.body;
    const _user = userController._findUserById(userId);

    // valid
    if (!_user) {
      res.status(404);
      res.send({ error: 'User not found' });
      return;
    }

    // valid
    if (userId === req.user.id) {
      res.status(403);
      res.send({ error: 'User already has own notes' });
      return;
    }

    // if not active
    if (!_user.data.isActive) {
      res.status(410);
      res.send({ error: 'User deleted his account :(' });
      return;
    }

    for (let i = 0; i < req.user.chats.length; i++) {
      const _chatId = req.user.chats[i];
      if (_user.data.chats.includes(_chatId)) {
        res.status(403);
        res.send({ error: 'You already have chat' });
        return;
      }
    }

    const _id = this._db.chats.length;

    const newChat = {
      id: _id,
      owners: [req.user.id, userId],
      messages: [],
    };

    const backupChats = JSON.stringify(this._db.chats);
    const backupUsers = JSON.stringify(this._db.users);

    // add a new id to array of user
    _user.data.chats.push(_id);

    const currentUser = userController._findUserById(req.user.id);
    // add a new id to array of current user
    currentUser.data.chats.push(_id);

    // add a new one chat
    this._db.chats.push(newChat);

    // try to save
    try {
      await Promise.all([
        writeFile('./databases/chats.db.json', JSON.stringify(this._db.chats)),
        writeFile('./databases/users.db.json', JSON.stringify(this._db.users)),
      ]);

      res.status(201);
      res.send({ data: newChat });
    } catch (error) {
      writeFile('./databases/chats.db.json', JSON.stringify(backupChats));
      writeFile('./databases/chats.db.json', JSON.stringify(backupUsers));

      res.status(500);
      return res.send({ error: err });
    }
  }

  // send message to chat
  sendMessage(req, res, next) {
    const chatId = Number(req.params.chatId);

    const user = { ...userController._findUserById(req.user.id) };

    // permission
    if (!user.data.chats.includes(chatId)) {
      res.status(403);
      res.send({ error: "You don't have permission" });
      return;
    }

    // valid
    if (!req.body.message.trim()) {
      res.status(400);
      res.send({ error: "Message can't not be empty" });
      return;
    }

    const currentChat = this._findChatById(chatId);

    // check
    if (!currentChat) {
      res.status(404);
      res.send({ error: 'No found chat' });
      return;
    }

    const _message = {
      id: currentChat.data.messages.length,
      text: req.body.message.trim(),
      creationDate: new Date(),
      modifyDate: null,
      owner: req.user.id,
    };

    currentChat.data.messages.push(_message);

    this._db.chats[currentChat.index] = currentChat.data;

    writeFile('./databases/chats.db.json', JSON.stringify(this._db.chats))
      .then(() => {
        res.status(201);
        res.send({ data: _message });
        return;
      })
      .catch((err) => {
        res.status(500);
        return res.send({ error: err });
      });
  }

  // ? PATCH

  // modify message by id in chat by id
  modifyMessage(req, res, next) {
    const chatId = Number(req.params.chatId);
    const messageId = Number(req.params.messageId);

    const user = { ...userController._findUserById(req.user.id) };

    // permission
    if (!user.data.chats.includes(chatId)) {
      res.status(403);
      res.send({ error: "You don't have permission" });
      return;
    }

    // valid
    if (!req.body.message.trim()) {
      res.status(400);
      res.send({ error: "Message can't not be empty" });
      return;
    }

    const currentChat = this._findChatById(chatId);

    // check
    if (!currentChat) {
      res.status(404);
      res.send({ error: 'No found chat' });
      return;
    }

    const currentMessage = this._findMessageByIdInChat(
      currentChat.data,
      messageId,
    );

    // check
    if (!currentMessage) {
      res.status(404);
      res.send({ error: 'No found message' });
      return;
    }

    // permission
    if (currentMessage.data.owner !== req.user.id) {
      res.status(403);
      res.send({ error: "You don't have permission to change this message" });
      return;
    }

    currentChat.data.messages[currentMessage.index] = {
      id: currentMessage.data.id,
      text: req.body.message.trim(),
      creationDate: currentMessage.data.creationDate,
      modifyDate: new Date(),
      owner: req.user.id,
    };

    this._db.chats[currentChat.index] = currentChat.data;

    const data = JSON.stringify(this._db.chats);

    // writing the JSON string content to a file
    fs.writeFile('./databases/chats.db.json', data, (error) => {
      // throwing the error
      // in case of a writing problem
      if (error) {
        // logging the error
        res.status(500);
        return res.send({ error: error });
      }

      return res.send();
    });
  }
}

const chatController = new ChatController({
  db: { chats: DB.CHATS, users: DB.USERS },
});

module.exports = chatController;
