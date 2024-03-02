// Info.controller.js

// ? models
const userSchema = require('./../models/user.model');

// ? utils
const { STATUS, MESSAGE } = require('./../utils/constants');

class Info {
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

    this.countAllUsers = this.countAllUsers.bind(this);
    this.countOnlineUsers = this.countOnlineUsers.bind(this);
  }

  // get count of all users
  async countAllUsers(data, req, ws) {
    return await userSchema
      .countDocuments()
      .then((result) => {
        ws.send(
          JSON.stringify({
            statusCode: STATUS.INFO.OK,
            statusMessage: MESSAGE.INFO.GET.SIMPLE,
            data: result,
          }),
        );
      })
      .catch((err) => {
        this.sendError(new Error(err));
      });
  }

  // get count of online users
  async countOnlineUsers(data, req, ws) {
    return await userSchema
      .countDocuments({ isActive: true })
      .then((result) => {
        ws.send(
          JSON.stringify({
            statusCode: STATUS.INFO.OK,
            statusMessage: MESSAGE.INFO.GET.SIMPLE,
            data: result,
          }),
        );
      })
      .catch((err) => {
        this.sendError(new Error(err));
      });
  }
}

module.exports = Info;
