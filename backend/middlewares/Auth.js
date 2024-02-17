// ! modules
const jwt = require('jsonwebtoken');

// ? utils
const { SERVER_SETTING } = require('../utils/constants');

class Auth {
  isUserAuthorized(req, res, next) {
    const token = req.headers['authorization'];
    if (token == null) {
      res.status(401);
      res.send({ error: 'You must be authorized' });
      return;
    }

    jwt.verify(token, SERVER_SETTING.SECRET_KEY, (err, user) => {
      if (err) {
        res.status(403);
        res.send({ error: 'Token is not valid' });
        return;
      }
      req.user = user;
      next();
    });
  }

  createJwtToken(user) {
    return jwt.sign(
      {
        id: user.id,
        chats: user.chats,
      },
      SERVER_SETTING.SECRET_KEY,
    );
  }
}

const auth = new Auth();

module.exports = auth;
