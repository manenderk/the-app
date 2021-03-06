const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require('./routes/users');
const roleRoutes = require('./routes/roles');
const organizationRoutes = require('./routes/organization');
const associationRequestRoutes = require('./routes/associationRequest');
const organizationRequestRoutes = require('./routes/organizationRequest');
const feedsRoute = require('./routes/feeds');
const chatChannelRoute = require('./routes/chatChannel');
const chatRoute = require('./routes/chat');
const eventRoute = require('./routes/events');

const cron = require('./util/feed-cron');
const clearData = require('./util/clear-data');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use('/images', express.static(path.join('the-server/images')));

mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

mongoose.connect('mongodb+srv://clusteruser:clusteruser@app-cluster-t6cjp.mongodb.net/test?retryWrites=true&w=majority')
  .then(() => console.log('Connected to database'))
  .catch(() => console.log('Connection failed'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Orgin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  next();
});

app.use('/api/user', userRoutes);
app.use('/api/role', roleRoutes);
app.use('/api/organization', organizationRoutes);
app.use('/api/pending-organization-association', associationRequestRoutes);
app.use('/api/organization-request', organizationRequestRoutes);
app.use('/api/feeds', feedsRoute);
app.use('/api/chat-channel', chatChannelRoute);
app.use('/api/chat', chatRoute);
app.use('/api/events', eventRoute);

module.exports = app;
