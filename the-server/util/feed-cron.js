const cron = require('node-cron');
const User = require('../models/user.schema');
const Feed = require('../models/feed.schema');
const now = new Date();
var previousDate = new Date();
previousDate.setDate(now.getDate() - 1);

//deleteAllFeed();

function isEventAdded(conditions) {
  return new Promise((resolve, reject) => {
    Feed.find(
      conditions
    ).then(docs => {
      if (docs.length == 0) {
        resolve(false);
      } else {
        //console.log('Already added docs: ' + docs);
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
            feed_type: 'Birthday'
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
        title: 'Happy Birthday',
        description: '',
        image: '',
        user_id: user._id,
        organization_id: user.organization_id,
        date: new Date(),
        active: true,
        feed_type: 'Birthday'
      }).save().then(doc => {
        //console.log('doc added' + doc);
      }).catch(err => {
        //console.log(err);
      })
    }
    else {
      //console.log('Birthday is already added');
    }
  });
}

function addAnniversoryInFeed(users) {
  users.forEach(async (user) => {
    const conditions = {
      "$expr": {
        "$and": [
          {
            organization_id: user.organization_id

          }, {
            user_id: user._id

          }, {
            feed_type: 'Anniversory'
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
        title: 'Happy Anniversory',
        description: '',
        image: '',
        user_id: user._id,
        organization_id: user.organization_id,
        date: new Date(),
        active: true,
        feed_type: 'Anniversory'
      }).save().then(doc => {
        //console.log('doc added' + doc);
      }).catch(err => {
        //console.log(err);
      })
    }
    else {
      //console.log('Anniversory is already added');
    }
  });
}


cron.schedule('* * * * *', () => {
  //For Birthdays
  User.find({
    "$expr": {
      "$and": [{
          "$eq": [{
            "$dayOfMonth": "$dob"
          }, {
            "$dayOfMonth": now
          }]
        },
        {
          "$eq": [{
            "$month": "$dob"
          }, {
            "$month": now
          }]
        }
      ]
    }
  }).then(users => {
    addBirthdaysInFeed(users);
  }).catch(err => {
    //console.log(err);
  })

  //For Anniversories
  User.find({
    "$expr": {
      "$and": [{
          "$eq": [{
            "$dayOfMonth": "$doj"
          }, {
            "$dayOfMonth": now
          }]
        },
        {
          "$eq": [{
            "$month": "$doj"
          }, {
            "$month": now
          }]
        }
      ]
    }
  }).then(users => {
    addAnniversoryInFeed(users);
  }).catch(err => {
    //console.log(err);
  })
});

function deleteAllFeed() {
  Feed.deleteMany({}).then(result => {
    //console.log(result);
  });
}

module.exports = cron;

