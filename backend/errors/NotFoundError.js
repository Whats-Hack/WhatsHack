// ? utils
const { STATUS } = require('../utils/constants');

module.exports = class NotFoundError extends Error {
  constructor(errMessage) {
    super(errMessage);
    this.statusCode = STATUS.ERROR.NOT_FOUND;
    this.errorMessage = errMessage;
  }
};
