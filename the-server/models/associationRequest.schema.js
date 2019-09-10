const mongoose = require('mongoose');

const AssociationRequest = mongoose.Schema({
  user_id: {
    type: String,
    required: true
  },
  organization_id: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('AssociationRequest', AssociationRequest);
