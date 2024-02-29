// ? utils
const { STATUS } = require('../utils/constants');

module.exports = class TooManyRequests extends Error {
  constructor(errMessage) {
    super(errMessage);
    this.statusCode = STATUS.ERROR.TOO_MANY_REQUESTS;
    this.errorMessage = errMessage;
  }
};
