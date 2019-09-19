const mongoose = require('mongoose');

const ChatChannel = mongoose.Schema({
  user_1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  user_2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('ChatChannel', ChatChannel);
