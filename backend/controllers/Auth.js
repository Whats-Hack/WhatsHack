// Auth.js

// ! modules
const fs = require('fs');

// ? middlewares
const { createJwtToken } = require('./../middlewares/Auth');
// ? utils
const { DB } = require('./../utils/constants');

class Auth {
  constructor({ db }) {
    this._db = db;

    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
  }

  // sign in
  login(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400);
      return res.send({ error: 'Username and password are required' });
    }

    for (let i = 0; i < this._db.length; i++) {
      const user = this._db[i];
      if (user.username === username) {
        if (user.password === password) {
          res.send({
            token: createJwtToken(user),
            data: {
              id: user.id,
              creationDate: user.creationDate,
              lastConnection: user.lastConnection,
              friends: user.friends,
              chats: user.chats,
              email: user.email,
              avatar: user.avatar,
              username: user.username,
              firstName: user.firstName,
              lastName: user.lastName,
              birthday: user.birthday,
              city: user.city,
              isActive: user.isActive,
            },
          });
        } else {
          res.status(400);
          res.send({ error: 'Password are wrong' });
        }
        return;
      }
    }

    res.status(404);
    res.send({ error: 'User not fround' });
  }

  // sing up
  register(req, res) {
    const {
      email,
      avatar,
      username,
      password,
      firstName,
      lastName,
      birthday,
      city,
    } = req.body;

    if (!username || !password) {
      res.status(400);
      return res.json({ error: 'Username and password are required' });
    }

    // validation for uniq username
    for (let i = 0; i < this._db.length; i++) {
      const user = this._db[i];
      if (user.username === username) {
        res.status(400);
        return res.json({ error: 'This username is already chosen' });
      }
    }

    const _id = this._db.length;

    const newUser = {
      id: _id,
      creationDate: new Date(),
      lastConnection: new Date(),
      friends: [],
      chats: [],
      email: email || null,
      avatar: avatar || null,
      username: username,
      password: password,
      firstName: firstName || null,
      lastName: lastName || null,
      birthday: birthday || null,
      city: city || null,
      isActive: true,
    };

    // add a new one user
    this._db.push(newUser);

    // converting the JSON object to a string
    const data = JSON.stringify(this._db);

    // writing the JSON string content to a file
    fs.writeFile('./databases/users.db.json', data, (error) => {
      // throwing the error
      // in case of a writing problem
      if (error) {
        // logging the error
        res.status(500);
        return res.send({ error: error });
      }

      delete password.password;

      res.status(201);
      res.send({
        data: newUser,
        message: 'User is created',
        token: createJwtToken({ id: _id, chats: [] }),
      });
      return;
    });
  }
}

const authController = new Auth({ db: DB.USERS });

module.exports = authController;
