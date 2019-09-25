const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  image: {
    type: String,
  },
  organization_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    required: true
  },
  active: {
    type: Boolean,
    default: false
  },
  created: {
    type: Date,
    required: true
  },
  modified: {
    type: Date
  }
});

module.exports = mongoose.model('Event', eventSchema);
