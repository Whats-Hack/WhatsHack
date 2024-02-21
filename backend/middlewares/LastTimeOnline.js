// LastTimeOnline.js

// ? controllers
const userController = require('./../controllers/User');

class LastTimeOnline {
  async updateTime(req, res, next) {
    const _user = userController._findUserById(req.user.id);

    _user.data.lastConnection = new Date();

    await Promise.all([userController._saveDB()]);

    next();
  }
}

const lastTimeOnline = new LastTimeOnline();

module.exports = lastTimeOnline;
