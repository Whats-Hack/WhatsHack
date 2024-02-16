// controller Chat.js

// ? utils
const { DB } = require("./../utils/constants");

class ChatController {
  constructor({ db }) {
    this._db = {
      users: db.users,
      chats: db.chats,
    };

    this.getAllChats = this.getAllChats.bind(this);
    this.getChatById = this.getChatById.bind(this);
  }

  // return all users chats
  getAllChats(req, res, next) {
    const chats = req.user.chats.map((chatId) => {
      let chat;
      for (let i = 0; i < this._db.chats.length; i++) {
        const _chat = this._db.chats[i];
        if (_chat.id === chatId) {
          chat = _chat;
          break;
        }
      }

      return chat;
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

    for (let i = 0; i < this._db.chats.length; i++) {
      const _chat = this._db.chats[i];
      if (_chat.id === chatId) {
        return res.send({ message: "getChatsById", data: _chat });
      }
    }
  }
}

const chatController = new ChatController({
  db: { chats: DB.CHATS, users: DB.USERS },
});

module.exports = chatController;
