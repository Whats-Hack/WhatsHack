// ? utils
const { STATUS } = require('../utils/constants');

module.exports = class ForbiddenError extends Error {
  constructor(errMessage) {
    super(errMessage);
    this.statusCode = STATUS.ERROR.FORBIDDEN;
    this.errorMessage = errMessage;
  }
};
