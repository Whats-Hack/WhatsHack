// auth.middlewares.js

// ! modules
const jwt = require('jsonwebtoken');

// ? utils
const { SERVER_SETTING } = require('../utils/constants');
const { NotAuthorizedError, ForbiddenError } = require('../errors/AllErrors');

class Auth {
  isUserAuthorized(req, token, sendError) {
    if (token == null) {
      return sendError(new NotAuthorizedError('Missing authorization token'));
    }

    jwt.verify(token, SERVER_SETTING.SECRET_KEY, (err, user) => {
      if (err) {
        return sendError(new ForbiddenError('Token is not valid'));
      }
      req.user = user;
      console.log(user);
    });
  }

  checkToken(token, req, sendError) {
    return jwt.verify(token, SERVER_SETTING.SECRET_KEY, (err, user) => {
      if (err) {
        sendError(new ForbiddenError('Token is not valid'));
        return false;
      }
      req.user = user;
      return true;
    });
  }

  createJwtToken(user) {
    return jwt.sign(
      {
        _id: user.id,
        username: user.username,
      },
      SERVER_SETTING.SECRET_KEY,
    );
  }
}

const auth = new Auth();

module.exports = auth;
