const mongoose = require('mongoose');

const Chat = mongoose.Schema({
  channel_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ChatChannel',
    required: true
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  text: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('Chat', Chat);
