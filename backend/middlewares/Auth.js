// ! modules
const jwt = require("jsonwebtoken");

// ? utils
const { SERVER_SETTING } = require("../utils/constants");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader;
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, SERVER_SETTING.SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

function createJwtToken(id) {
  return jwt.sign(
    {
      id: id,
    },
    SERVER_SETTING.SECRET_KEY
  );
}

module.exports = {
  authenticateToken,
  createJwtToken,
};
