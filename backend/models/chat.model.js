// chat.model.js

// ! modules
const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    creationDate: {
      type: Date,
      default: () => new Date(),
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
    ], // list of users id
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'message',
      },
    ],
    photo: {
      type: String,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('chat', chatSchema);
