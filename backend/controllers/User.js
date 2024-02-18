// controller User.js

// ? utils
const { DB } = require('./../utils/constants');

class UserController {
  constructor({ db }) {
    this._db = db;

    this.getAllUsers = this.getAllUsers.bind(this);
    this.getUserById = this.getUserById.bind(this);
    this.getUserByToken = this.getUserByToken.bind(this);
  }

  // get current user info
  getUserByToken(req, res, next) {
    const userId = req.user.id;

    for (let i = 0; i < this._db.length; i++) {
      const _user = this._db[i];
      if (_user.id === userId) {
        const userSend = {
          id: _user.id,
          creationDate: _user.creationDate,
          lastConnection: _user.lastConnection,
          friends: _user.friends,
          chats: _user.chats,
          email: _user.email,
          avatar: _user.avatar,
          username: _user.username,
          firstName: _user.firstName,
          lastName: _user.lastName,
          birthday: _user.birthday,
          city: _user.city,
          isActive: _user.isActive,
        };

        return res.send({ data: userSend });
      }
    }

    res.status(404);
    res.send({ error: 'User not found' });
  }

  // return all users
  getAllUsers(req, res, next) {
    const users = [];

    for (let i = 0; i < this._db.length; i++) {
      const _user = this._db[i];

      const userToPush = {
        id: _user.id,
        creationDate: _user.creationDate,
        friends: _user.friends,
        email: _user.email,
        avatar: _user.avatar,
        username: _user.username,
        firstName: _user.firstName,
        lastName: _user.lastName,
        birthday: _user.birthday,
        city: _user.city,
        isActive: _user.isActive,
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

    for (let i = 0; i < this._db.length; i++) {
      const _user = this._db[i];
      const _userId = String(_user.id);
      if (_userId === userId) {
        const userSend = {
          id: _userId,
          creationDate: _user.creationDate,
          friends: _user.friends,
          email: _user.email,
          avatar: _user.avatar,
          username: _user.username,
          firstName: _user.firstName,
          lastName: _user.lastName,
          birthday: _user.birthday,
          city: _user.city,
          isActive: _user.isActive,
        };

        // if they are friends -> add info about lastConnection
        if (_user.friends.includes(req.user.id) || _userId === req.user.id) {
          userSend.lastConnection = _user.lastConnection;
        }

        return res.send({ data: userSend });
      }
    }

    res.status(404);
    res.send({ error: 'User not found' });
  }
}

const userController = new UserController({ db: DB.USERS });

module.exports = userController;
