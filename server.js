const app = require('./the-server/app');
const http = require('http');

const normalizePort = val => {
  var port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}

const onError = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = typeof addr === 'string' ? 'pipe' + addr : 'port ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' required elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe' + addr : 'port ' + port;
  console.log('Listening on ' + bind);
}

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);
const io = require('socket.io')(server);

server.on('error', onError);
server.on('listening', onListening);
server.listen(port);

io.on('connection', function(socket) {
  socket.on('join-socket', (data) => {
    const userId = data.userId;
    console.log('User joined channel');
    socket.join(userId);
  })

  socket.on('leave-socket', (data) => {
    const userId = data.userId;
    console.log('User left channel');
    socket.leaveAll();
  })

  socket.on('add-message', (data) => {
    console.log(data);
    const recipientId = data.recipientId;
    io.to(recipientId).emit('new-message', data);
  })
});

