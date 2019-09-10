const mongoose = require('mongoose');

const pendingOrganizationSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Organization', organizationSchema);
