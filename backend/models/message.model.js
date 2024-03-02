// message.model.js

// ! modules
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    creationDate: {
      type: Date,
      default: () => new Date(),
    },
    updatedDate: {
      type: Date,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      require: true,
    }, // id of owner
    type: {
      type: String,
      require: true,
      enum: ['text', 'img', 'url', 'system'],
    },
    // any info
    value: {
      type: String,
      require: true,
    },
    status: {
      type: Object,
      // {
      //   "123": "sent" // "sent", "received", "read"
      // }
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('message', messageSchema);
