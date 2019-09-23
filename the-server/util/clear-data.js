const Feed = require('../models/feed.schema');
const Channel = require('../models/chatChannel.schema');
const Chat = require('../models/chat.schema');


function deleteAllFeed() {
  Feed.deleteMany({}).then(result => {
    console.log('Cleared Feeds');
  });
}

function deleteAllChannels() {
  Channel.deleteMany({}).then(result => {
    console.log("Cleared Channels");
  })
}

function deleteAllChats() {
  Chat.deleteMany({}).then(result => {
    console.log("Cleared Chats");
  })
}

//deleteAllFeed();
//deleteAllChannels();
//deleteAllChats();
