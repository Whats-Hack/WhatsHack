// ! modules
require("dotenv").config();

// * databases
const usersDb = require("./../databases/users.db.json");
const chatDb = require("./../databases/chats.db.json");

const SERVER_SETTING = {
  PORT: process.env.PORT || 5005,
  SECRET_KEY: process.env.SECRET_KEY || "your_secret_key",
};

const DB = {
  USERS: usersDb,
  CHATS: chatDb,
};

module.exports = {
  SERVER_SETTING,
  DB,
};
