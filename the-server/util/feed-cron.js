const cron = require('node-cron');
const User = require('../models/user.schema');
const Feed = require('../models/feed.schema');
const now = new Date();
var previousDate = new Date();
previousDate.setDate(now.getDate() - 1);

function isEventAdded(conditions) {
  return new Promise((resolve, reject) => {
    Feed.find(
      conditions
    ).then(docs => {
      if (docs.length == 0) {
        resolve(false);
      } else {
        resolve(true);
      }
    }).catch(err => {
      reject(err);
    })
  });

}

function addBirthdaysInFeed(users) {
  users.forEach(async (user) => {
    const conditions = {
      "$expr": {
        "$and": [
          {
            organization_id: user.organization_id

          }, {
            user_id: user._id

          }, {
            type: 'Birthday'
          }, {
            "$eq": [{
              "$dayOfMonth": "$date"
            }, {
              "$dayOfMonth": now
            }]
          }, {
            "$eq": [{
              "$month": "$date"
            }, {
              "$month": now
            }]
          }, {
            "$eq": [{
              "$year": "$date"
            }, {
              "$year": now
            }]
          }
        ]
      }
    };
    const result = await isEventAdded(conditions);
    if (!result)  {
      const feed = new Feed({
        title: 'Happy Birtday',
        description: '',
        image: '',
        user_id: user._id,
        organization_id: user.organization_id,
        date: new Date(),
        active: true,
        feed_type: 'Birthday'
      }).save().then(doc => {
        console.log('doc added' + doc);
      }).catch(err => {
        console.log(err);
      })
    }
    else {
      console.log('Event is already added');
    }
  });
}

cron.schedule('* * * * *', () => {

  User.find({
    "$expr": {
      "$and": [{
          "$eq": [{
            "$dayOfMonth": "$dob"
          }, {
            "$dayOfMonth": previousDate
          }]
        },
        {
          "$eq": [{
            "$month": "$dob"
          }, {
            "$month": previousDate
          }]
        }
      ]
    }
  }).then(users => {
    addBirthdaysInFeed(users);
  }).catch(err => {
    console.log(err);
  })
});

module.exports = cron;

