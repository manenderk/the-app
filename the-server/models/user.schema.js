const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  first_name: {
    type: String,
    required: true
  },
  middle_name: {
    type: String,
    default: ''
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  employee_id: {
    type: String,
    default: ''
  },
  dob: {
    type: Date,
  },
  organization_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization'
  },
  role_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
  },
  active: {
    type: Boolean,
    default: false
  },
  created: {
    type: Date,
  },
  modified: {
    type: Date,
  }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
