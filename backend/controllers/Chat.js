// controller Chat.js

// ! modules
const fs = require("fs");

// ? utils
const { DB } = require("./../utils/constants");

class ChatController {
  constructor({ db }) {
    this._db = {
      users: db.users,
      chats: db.chats,
    };

    this._findChatById = this._findChatById.bind(this);
    this.getAllChats = this.getAllChats.bind(this);
    this.getChatById = this.getChatById.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.modifyMessage = this.modifyMessage.bind(this);
    this._findMessageByIdInChat = this._findMessageByIdInChat.bind(this);
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
    const chats = req.user.chats.map((chatId) => {
      return this._findChatById(chatId).data;
    });

    res.send({
      data: chats,
    });
  }

  // returns 1 by id
  getChatById(req, res, next) {
    const chatId = Number(req.params.chatId);

    // valid
    if (!req.user.chats.includes(chatId)) {
      res.status(403);
      res.send({ error: "You don't have permission" });
      return;
    }

    const chat = this._findChatById(chatId).data;

    return res.send({ data: chat });
  }

  // ? POST

  // send message to chat
  sendMessage(req, res, next) {
    const chatId = Number(req.params.chatId);

    // permission
    if (!req.user.chats.includes(chatId)) {
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
      res.send({ error: "No found chat" });
      return;
    }

    currentChat.data.messages.push({
      id: currentChat.data.messages.length,
      text: req.body.message.trim(),
      creationDate: new Date(),
      modifyDate: null,
      owner: req.user.id,
    });

    this._db.chats[currentChat.index] = currentChat.data;

    const data = JSON.stringify(this._db.chats);

    // writing the JSON string content to a file
    fs.writeFile("./databases/chats.db.json", data, (error) => {
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

  // ? PATCH

  // modify message by id in chat by id
  modifyMessage(req, res, next) {
    const chatId = Number(req.params.chatId);
    const messageId = Number(req.params.messageId);

    // permission
    if (!req.user.chats.includes(chatId)) {
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
      res.send({ error: "No found chat" });
      return;
    }

    const currentMessage = this._findMessageByIdInChat(
      currentChat.data,
      messageId
    );

    // check
    if (!currentMessage) {
      res.status(404);
      res.send({ error: "No found message" });
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
    fs.writeFile("./databases/chats.db.json", data, (error) => {
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
