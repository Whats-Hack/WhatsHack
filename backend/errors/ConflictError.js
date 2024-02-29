// ? utils
const { STATUS } = require('../utils/constants');

module.exports = class ConflictError extends Error {
  constructor(errMessage) {
    super(errMessage);
    this.statusCode = STATUS.ERROR.CONFLICT;
    this.errorMessage = errMessage;
  }
};
