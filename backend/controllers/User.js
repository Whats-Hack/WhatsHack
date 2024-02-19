// controller User.js

// ? utils
const { DB } = require('./../utils/constants');

class UserController {
  constructor({ db }) {
    this._db = db;

    this.getAllUsers = this.getAllUsers.bind(this);
    this.getUserById = this.getUserById.bind(this);
    this._findUserById = this._findUserById.bind(this);
    this.getUserByToken = this.getUserByToken.bind(this);
  }

  /*** find user by id
   * @params id - id of chat
   * @returns null or user
   */
  _findUserById(id) {
    for (let i = 0; i < this._db.length; i++) {
      const _user = this._db[i];
      const _userId = String(_user.id);
      if (_userId === String(id)) {
        return { data: _user, index: i };
      }
    }
    return null;
  }

  // get current user info
  getUserByToken(req, res, next) {
    const userId = req.user.id;

    const user = this._findUserById(userId);

    // valid
    if (!user) {
      res.status(404);
      res.send({ error: 'User not found' });
      return;
    }

    const userSend = {
      id: user.data.id,
      creationDate: user.data.creationDate,
      lastConnection: user.data.lastConnection,
      friends: user.data.friends,
      chats: user.data.chats,
      email: user.data.email,
      avatar: user.data.avatar,
      username: user.data.username,
      firstName: user.data.firstName,
      lastName: user.data.lastName,
      birthday: user.data.birthday,
      city: user.data.city,
      isActive: user.data.isActive,
    };

    return res.send({ data: userSend });
  }

  // return small info about all users
  getAllUsers(req, res, next) {
    const users = [];

    for (let i = 0; i < this._db.length; i++) {
      const _user = this._db[i];

      // if not active
      if (!_user.isActive) {
        continue;
      }

      const userToPush = {
        id: _user.id,
        avatar: _user.avatar,
        username: _user.username,
      };

      // if they are friends -> add info about lastConnection
      if (_user.friends.includes(req.user.id)) {
        userToPush.lastConnection = _user.lastConnection;
      }

      users.push(userToPush);
    }

    res.send({
      data: users,
    });
  }

  // returns 1 by id
  getUserById(req, res, next) {
    const { userId } = req.params;

    const _user = this._findUserById(userId);

    // valid
    if (!_user) {
      res.status(404);
      res.send({ error: 'User not found' });
      return;
    }

    // if not active
    if (!_user.data.isActive) {
      res.status(410);
      res.send({ error: 'User deleted his account :(' });
      return;
    }

    const userSend = {
      id: _user.data.id,
      creationDate: _user.data.creationDate,
      friends: _user.data.friends,
      email: _user.data.email,
      avatar: _user.data.avatar,
      username: _user.data.username,
      firstName: _user.data.firstName,
      lastName: _user.data.lastName,
      birthday: _user.data.birthday,
      city: _user.data.city,
    };

    // if they are friends -> add info about lastConnection
    if (
      _user.data.friends.includes(req.user.id) ||
      _user.data.id === req.user.id
    ) {
      userSend.lastConnection = _user.lastConnection;
    }

    return res.send({ data: userSend });
  }
}

const userController = new UserController({ db: DB.USERS });

module.exports = userController;
