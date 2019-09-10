const User = require('../models/user.schema');
const Organization = require('../models/organization.schema');
class CommonUtil {
  approveUserAssociationWithOrganization(userId, organizationId) {
    return new Promise(function(resolve, reject) {
      User.updateOne({
        _id: userId
      }, {
        organization_id: organizationId
      }).then(r => {
        if (r.nModified == 0) {
          resolve(false);
        } else {
          resolve(true);
        }
      }).catch(err => {
        resolve(false);
      })
    });
  }
}

module.exports = CommonUtil;

