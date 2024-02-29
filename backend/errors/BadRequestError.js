// ? utils
const { STATUS } = require('../utils/constants');

module.exports = class BadRequestError extends Error {
  constructor(errMessage) {
    super(errMessage);
    this.statusCode = STATUS.ERROR.BAD_REQUEST;
    this.errorMessage = errMessage;
  }
};
