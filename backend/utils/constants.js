// ! modules
require("dotenv").config();

// * database
const db = require("./../databases/db.json");

const SERVER_SETTING = {
  PORT: process.env.PORT || 5005,
  SECRET_KEY: process.env.SECRET_KEY || "your_secret_key",
};

module.exports = {
  SERVER_SETTING,
  db,
};
