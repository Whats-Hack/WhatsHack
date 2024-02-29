const BadRequestError = require('./BadRequestError');
const ConflictError = require('./ConflictError');
const ForbiddenError = require('./ForbiddenError');
const NotAuthorizedError = require('./NotAuthorizedError');
const NotFoundError = require('./NotFoundError');
const TooManyRequests = require('./TooManyRequests');

module.exports = {
  BadRequestError,
  ConflictError,
  ForbiddenError,
  NotAuthorizedError,
  NotFoundError,
  TooManyRequests,
};
