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
  active: {
    type: Boolean,
    default: false
  },
  created: {
    type: Date
  },
  modified: {
    type: Date
  }
});

module.exports = mongoose.model('Organization', organizationSchema);
