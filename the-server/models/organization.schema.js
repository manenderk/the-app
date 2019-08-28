const mongoose = require('mongoose');

const organizationSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  logo: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now
  },
  modified: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Organization', organizationSchema);
