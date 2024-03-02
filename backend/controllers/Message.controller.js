// Message.controller.js

// ? errors
const {
  BadRequestError,
  NotFoundError,
  ForbiddenError,
} = require('../errors/AllErrors');

// ? models
const userSchema = require('./../models/user.model');
const messageSchema = require('./../models/message.model');
const chatSchema = require('./../models/chat.model');

// ? utils
const { STATUS, MESSAGE } = require('./../utils/constants');
const { isValidHex24 } = require('./../utils/utils');

class Message {
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
    this.createOneMessage = this.createOneMessage.bind(this);
    this.deleteMessageById = this.deleteMessageById.bind(this);
    this.changeValueOfMessageById = this.changeValueOfMessageById.bind(this);
    this.changeStatusOfMessageById = this.changeStatusOfMessageById.bind(this);
  }

  // create message in chat by id
  async createOneMessage(data, req, ws) {
    // check id
    if (!isValidHex24(data.data.chatId))
      return this.sendError(new BadRequestError(MESSAGE.ERROR.VALIDATION.ID));

    // valid data
    // type
    if (!['text', 'img', 'url'].includes(data.data.type))
      return this.sendError(
        new BadRequestError(MESSAGE.ERROR.VALIDATION.MESSAGE.TYPE),
      );
    // value
    if (!data.data.value)
      return this.sendError(
        new BadRequestError(MESSAGE.ERROR.VALIDATION.MESSAGE.VALUE),
      );

    const _value = data.data.value.trim();

    // value
    if (!_value)
      return this.sendError(
        new BadRequestError(MESSAGE.ERROR.VALIDATION.MESSAGE.VALUE),
      );

    // try find chat
    const _chat = await chatSchema.findById(data.data.chatId);

    // check if chat exist
    if (!_chat)
      return this.sendError(new NotFoundError(MESSAGE.ERROR.NOT_FOUND.CHAT));

    // check permission
    if (!_chat.users.includes(req.user._id))
      return this.sendError(new ForbiddenError(MESSAGE.ERROR.FORBIDDEN.CHAT));

    const status = {};

    _chat.users.forEach((userId) => {
      status[userId] = 'sent';
    });

    status[req.user._id] = 'read';

    // create a message
    const message = await messageSchema.create({
      owner: req.user._id,
      type: data.data.type,
      value: _value,
      status: status,
    });

    // add id of message to chat
    _chat.messages.push(message._id);
    await _chat.save();

    ws.send(
      JSON.stringify({
        type: 'message',
        action: 'create',
        chatId: _chat._id,
        data: message,
      }),
    );

    this.sendInfoToUserById(
      {
        type: 'message',
        action: 'create',
        chatId: _chat._id,
        data: message,
      },
      { isActive: true },
      _chat.users,
    );
  }

  // change status of message to "received" or "read" by id
  async changeStatusOfMessageById(data, req, ws) {
    // check id
    if (!isValidHex24(data.data.messageId) && data.data.chatId)
      return this.sendError(new BadRequestError(MESSAGE.ERROR.VALIDATION.ID));

    // valid data
    // type
    if (!['received', 'read'].includes(data.data.status))
      return this.sendError(
        new BadRequestError(MESSAGE.ERROR.VALIDATION.MESSAGE.STATUS),
      );

    const message = await messageSchema.findByIdAndUpdate(
      data.data.messageId,
      {
        $set: { [`status.${req.user._id}`]: data.data.status },
      },
      { new: true },
    );

    await chatSchema.findById(data.data.chatId).then((chat) => {
      const _dataToSend = {
        type: 'message',
        action: 'change status',
        chatId: chat._id,
        data: message,
      };

      ws.send(JSON.stringify(_dataToSend));

      this.sendInfoToUserById(_dataToSend, { isActive: true }, chat.users);
    });
  }

  // change value of message by id
  async changeValueOfMessageById(data, req, ws) {
    // check id
    if (!isValidHex24(data.data.messageId) && data.data.chatId)
      return this.sendError(new BadRequestError(MESSAGE.ERROR.VALIDATION.ID));

    // valid data
    // value
    if (!data.data.value)
      return this.sendError(
        new BadRequestError(MESSAGE.ERROR.VALIDATION.MESSAGE.VALUE),
      );

    const _value = data.data.value.trim();

    // value
    if (!_value)
      return this.sendError(
        new BadRequestError(MESSAGE.ERROR.VALIDATION.MESSAGE.VALUE),
      );

    const message = await messageSchema.findOneAndUpdate(
      {
        _id: data.data.messageId,
        owner: req.user._id,
      },
      {
        $set: {
          value: _value,
          updatedDate: new Date(),
        },
      },
      { new: true, condition: { owner: req.user._id } },
    );

    if (!message)
      return this.sendError(
        new ForbiddenError(MESSAGE.ERROR.FORBIDDEN.MESSAGE),
      );

    await chatSchema.findById(data.data.chatId).then((chat) => {
      const _dataToSend = {
        type: 'message',
        action: 'change value',
        chatId: chat._id,
        data: message,
      };

      ws.send(JSON.stringify(_dataToSend));

      this.sendInfoToUserById(_dataToSend, { isActive: true }, chat.users);
    });
  }

  // delete message by id
  async deleteMessageById(data, req, ws) {
    // check id
    if (!isValidHex24(data.data.messageId) && data.data.chatId)
      return this.sendError(new BadRequestError(MESSAGE.ERROR.VALIDATION.ID));

    // valid data
    // value
    if (!data.data.value)
      return this.sendError(
        new BadRequestError(MESSAGE.ERROR.VALIDATION.MESSAGE.VALUE),
      );

    const _value = data.data.value.trim();

    // value
    if (!_value)
      return this.sendError(
        new BadRequestError(MESSAGE.ERROR.VALIDATION.MESSAGE.VALUE),
      );

    const message = await messageSchema.findOneAndUpdate(
      {
        _id: data.data.messageId,
        owner: req.user._id,
      },
      {
        $set: {
          value: MESSAGE.SYSTEM.MESSAGE.DELETE(req.user.username),
          type: 'system',
          updatedDate: new Date(),
        },
      },
      { new: true, condition: { owner: req.user._id } },
    );

    if (!message)
      return this.sendError(
        new ForbiddenError(MESSAGE.ERROR.FORBIDDEN.MESSAGE),
      );

    await chatSchema.findById(data.data.chatId).then((chat) => {
      const _dataToSend = {
        type: 'message',
        action: 'delete message',
        chatId: chat._id,
        data: message,
      };

      ws.send(JSON.stringify(_dataToSend));

      this.sendInfoToUserById(_dataToSend, { isActive: true }, chat.users);
    });
  }
}

module.exports = Message;
