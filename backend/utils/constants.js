// constants.js

// ! modules
require('dotenv').config();

const SERVER_SETTING = {
  PORT: process.env.PORT || 5005,
  SECRET_KEY: process.env.SECRET_KEY || 'your_secret_key',
};

const MESSAGE = {
  ERROR: {
    BAD_REQUEST: {
      SIMPLE: 'Bad request',
      CHAT: {
        USER_EMPTY: 'There must be at least one user',
      },
    },
    INCORRECT_DATA: {
      SIMPLE: 'Incorrect data entered',
    },
    FORBIDDEN: {
      SIMPLE: 'You are not allowed to do this operation',
      CHAT: 'You have no access to this chat',
      MESSAGE: 'You have no access to this message',
    },
    NOT_FOUND: {
      SIMPLE: 'Not found',
      USER: 'User not found',
      USERS: 'Not all users found',
      ROUTER: 'Router not found',
      CHAT: 'Chat not found',
    },
    NOT_AUTHORIZED: {
      SIMPLE: 'User is not authorized',
    },
    SERVER: {
      SIMPLE: 'SERVER ERROR',
    },
    PASS: {
      SIMPLE: 'Wrong password',
    },
    DUPLICATE: {
      SIMPLE: 'You can not use these parameters, try other ones',
      USER: 'There is already a user with this username',
      CHAT: 'Chat already exist',
    },
    VALIDATION: {
      SIMPLE: 'Validation error',
      EMAIL: 'Email validation error',
      URL: 'URL validation error',
      ID: 'Invalid id',
      MESSAGE: {
        TYPE: 'Invalid type of message',
        VALUE: 'Value must be existed',
        STATUS: 'Invalid status of message',
      },
    },
  },
  INFO: {
    GET: {
      SIMPLE: 'Here info',
      USER: 'Here user info',
      CHAT: 'Here chat info',
    },
    CREATED: {
      SIMPLE: 'Created',
      USER: 'User has been created',
      CHAT: 'Chat has been created',
      MESSAGE: 'Messages has been sended',
    },
    POST: {
      SIMPLE: 'Was successful posted',
    },
    DELETE: {
      SIMPLE: 'Deleted',
    },
    PUT: {
      SIMPLE: 'Was successful put',
      FILE: 'File was successful upload',
    },
    PATCH: {
      SIMPLE: 'Info patched',
      USER: 'Info of user was successful updated',
    },
    LOGOUT: { SIMPLE: 'You have successfully logged out' },
    LOGIN: { SIMPLE: 'You have successfully logged in' },
  },
  SYSTEM: {
    CHAT: {
      SIMPLE: '',
    },
    MESSAGE: {
      SIMPLE: '',
      DELETE: (msg = 'user') => `Message was delete by ${msg}`,
    },
  },
};

const STATUS = {
  ERROR: {
    BAD_REQUEST: 400,
    NOT_AUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    TOO_MANY_REQUESTS: 429,
    SERVER: 500,
  },
  INFO: {
    OK: 200,
    CREATED: 201,
  },
};

module.exports = {
  SERVER_SETTING,
  MESSAGE,
  STATUS,
};
