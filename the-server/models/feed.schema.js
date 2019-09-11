const mongoose = require('mongoose');

const roleSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: new Date()
  },
  active: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Role', roleSchema);
