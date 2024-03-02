// Chat.controller.js

// ? errors
const {
  BadRequestError,
  NotFoundError,
  ConflictError,
  ForbiddenError,
} = require('../errors/AllErrors');

// ? models
const userSchema = require('./../models/user.model');
const chatSchema = require('./../models/chat.model');

// ? utils
const { STATUS, MESSAGE } = require('./../utils/constants');
const { isValidHex24 } = require('./../utils/utils');

class Chat {
  constructor({
    sendError,
    sendInfoToUserById,
    sendInfoToUsersOnline,
    updateConnectionsInfo,
  }) {
    this.sendError = sendError;
    this.sendInfoToUserById = sendInfoToUserById;
    this.sendInfoToUsersOnline = sendInfoToUsersOnline;
    this.updateConnectionsInfo = updateConnectionsInfo;

    // ? binding
    this.getInfoById = this.getInfoById.bind(this);
    this.createOneChat = this.createOneChat.bind(this);
  }

  // create a new one chat
  async createOneChat(data, req, ws) {
    // check
    for (let i = 0; i <= data.data.usersId.length - 1; i++) {
      const _userId = data.data.usersId[i];
      if (!isValidHex24(_userId)) {
        return this.sendError(new BadRequestError(MESSAGE.ERROR.VALIDATION.ID));
      }
    }

    const _usersIdSet = new Set(data.data.usersId);

    _usersIdSet.delete(req.user._id);

    if (_usersIdSet.size === 0) {
      return this.sendError(
        new BadRequestError(MESSAGE.ERROR.BAD_REQUEST.CHAT.USER_EMPTY),
      );
    }

    const _usersIdArray = Array.from(_usersIdSet);

    const users = await userSchema.find({ _id: { $in: _usersIdArray } });

    // check if all users existed
    if (users.length !== _usersIdArray.length) {
      return this.sendError(new NotFoundError(MESSAGE.ERROR.NOT_FOUND.USERS));
    }

    const _allUsersInChat = [req.user._id, ..._usersIdArray];

    // try to find chat in db
    const _chat = await chatSchema.findOne({
      users: { $all: _allUsersInChat.sort() },
    });
    // if yes, send error
    if (_chat)
      return this.sendError(new ConflictError(MESSAGE.ERROR.DUPLICATE.CHAT));

    return await chatSchema
      .create({
        name: data.data.name || 'New chat',
        users: _allUsersInChat,
        photo: data.data.photo,
      })
      .then(async (result) => {
        for (const userId of _allUsersInChat) {
          // Находим и обновляем пользователя по его ID
          await userSchema.findByIdAndUpdate(userId, {
            $push: { chats: result._id },
          });
        }

        // send answer
        ws.send(
          JSON.stringify({
            statusCode: STATUS.INFO.CREATED,
            statusMessage: MESSAGE.INFO.CREATED.CHAT,
            data: result,
          }),
        );

        this.sendInfoToUserById(
          {
            type: 'chat',
            action: 'create',
            data: result,
          },
          { isActive: true },
          _usersIdArray,
        );
      });
  }

  // get chat info by id
  async getInfoById(data, req, ws) {
    // check id
    if (!isValidHex24(data.data.chatId)) {
      return this.sendError(new BadRequestError(MESSAGE.ERROR.VALIDATION.ID));
    }

    // try to find chat in db
    const _chat = await chatSchema
      .findById(data.data.chatId)
      .populate('messages');
    // if yes, send error
    if (!_chat)
      return this.sendError(new NotFoundError(MESSAGE.ERROR.NOT_FOUND.CHAT));

    // check permission
    if (!_chat.users.includes(req.user._id))
      return this.sendError(new ForbiddenError(MESSAGE.ERROR.FORBIDDEN.CHAT));

    // send answer
    ws.send(
      JSON.stringify({
        statusCode: STATUS.INFO.OK,
        statusMessage: MESSAGE.INFO.GET.CHAT,
        data: _chat,
      }),
    );
  }
}

module.exports = Chat;
