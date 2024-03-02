// User.controller.js

// ? errors
const { NotFoundError } = require('../errors/AllErrors');

// ? models
const userSchema = require('./../models/user.model');

// ? utils
const { STATUS, MESSAGE } = require('./../utils/constants');

class User {
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

    this.getUserInfo = this.getUserInfo.bind(this);
    this.getUserInfoById = this.getUserInfoById.bind(this);
    this.updateUserInfo = this.updateUserInfo.bind(this);
  }

  // get info about current user
  async getUserInfo(data, req, ws) {
    return await userSchema
      .findById(req.user._id)
      .then((result) => {
        ws.send(
          JSON.stringify({
            statusCode: STATUS.INFO.OK,
            statusMessage: MESSAGE.INFO.GET.USER,
            data: result,
          }),
        );
      })
      .catch((err) => {
        this.sendError(new Error(err));
      });
  }

  // get info about user by id
  async getUserInfoById(data, req, ws) {
    return await userSchema
      .findById(data.data.userId)
      .orFail(() => {
        this.sendError(new NotFoundError(MESSAGE.ERROR.NOT_FOUND.USER));
      })
      .then((result) => {
        const userInfo = { ...result }._doc;

        delete userInfo.chats;

        ws.send(
          JSON.stringify({
            statusCode: STATUS.INFO.OK,
            statusMessage: MESSAGE.INFO.GET.USER,
            data: userInfo,
          }),
        );
      })
      .catch((err) => {
        this.sendError(new Error(err));
      });
  }

  // update user information
  async updateUserInfo(data, req, ws) {
    return await userSchema
      .findByIdAndUpdate(
        req.user._id,
        {
          email: data.data.email,
          avatar: data.data.avatar,
          firstName: data.data.firstName,
          lastName: data.data.lastName,
          birthday: data.data.birthday,
          city: data.data.city,
        },
        { new: true },
      )
      .orFail(() => {
        this.sendError(new NotFoundError(MESSAGE.ERROR.NOT_FOUND.USER));
      })
      .then((result) => {
        ws.send(
          JSON.stringify({
            statusCode: STATUS.INFO.OK,
            statusMessage: MESSAGE.INFO.PATCH.USER,
            data: result,
          }),
        );

        this.sendAllOnline(
          {
            type: 'user',
            action: 'update',
            userId: result._id,
          },
          { isActive: true },
        );
      })
      .catch((err) => {
        this.sendError(new Error(err));
      });
  }
}

module.exports = User;
