const mongoose = require('mongoose');

const OrganizationRequest = mongoose.Schema({
  organization_name: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('OrganizationRequest', OrganizationRequest);
