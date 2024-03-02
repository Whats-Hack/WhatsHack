// Auth.controller.js

// ! modules
const bcrypt = require('bcrypt');

// ? error
const { ConflictError } = require('./../errors/AllErrors');

// ? middlewares
const auth = require('./../middlewares/auth.middlewares');

// ? models
const userSchema = require('./../models/user.model');

// ? utils
const { STATUS, MESSAGE } = require('./../utils/constants');

class Auth {
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

    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.loginByToken = this.loginByToken.bind(this);
  }

  // login by data
  async login(data, req, ws) {
    return await userSchema
      .findUserByCredentials(data.data.username, data.data.password)
      .then(async (result) => {
        result.isActive = true;
        await result.save();

        this.updateConnectionsInfo(ws, result);

        ws.send(
          JSON.stringify({
            statusCode: STATUS.INFO.OK,
            statusMessage: MESSAGE.INFO.LOGIN.SIMPLE,
            token: auth.createJwtToken(result),
          }),
        );
      })
      .catch((err) => {
        this.sendError(err);
      });
  }

  // login by token
  async loginByToken(data, req, ws) {
    if (!auth.checkToken(data.token, req, this.sendError)) return;

    return await userSchema
      .findByIdAndUpdate(req.user._id, {
        isActive: true,
      })
      .then(async (result) => {
        this.updateConnectionsInfo(ws, result);

        this.sendInfoToUsersOnline({
          type: 'user',
          action: 'login',
          userId: result._id,
        });
      })
      .catch((err) => {
        this.sendError(err);
      });
  }

  // create a new user
  async signup(data, req, ws) {
    return await bcrypt.hash(data.data.password, 10).then(async (hash) => {
      await userSchema
        .create({
          username: data.data.username,
          password: hash,
          email: data.data.email,
          avatar: data.data.avatar,
          firstName: data.data.firstName,
          lastName: data.data.lastName,
          birthday: data.data.birthday,
          city: data.data.city,
        })
        .then((result) => {
          this.updateConnectionsInfo(ws, result);

          // make auth token
          const token = auth.createJwtToken(result);
          // send answer
          ws.send(
            JSON.stringify({
              statusCode: STATUS.INFO.CREATED,
              statusMessage: MESSAGE.INFO.CREATED.USER,
              data: result,
              token: token,
            }),
          );

          this.sendInfoToUsersOnline({
            type: 'user',
            action: 'signup',
            userId: result._id,
          });
        })
        .catch((err) => {
          if (err.code === 11000) {
            return this.sendError(
              new ConflictError(MESSAGE.ERROR.DUPLICATE.USER),
            );
          }
        });
    });
  }
}

module.exports = Auth;
