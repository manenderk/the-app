const mongoose = require('mongoose');

const FeedSchema = mongoose.Schema({
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
  organization_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
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
  },
  feeed_type: {
    type: String,
    enum: ['Event', 'Birthday', 'Anniversory']
  }
});

module.exports = mongoose.model('Feed', FeedSchema);
