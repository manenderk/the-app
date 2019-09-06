const mongoose = require('mongoose');

const PendingOrganizationAssociation = mongoose.Schema({
  user_id: {
    type: String,
    required: true
  },
  organization_id: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('PendingOrganizationAssociation', PendingOrganizationAssociation);
