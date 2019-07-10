import * as path from 'path';
import * as express from 'express';
import * as sockets from 'socket.io';
import  { createServer } from 'http';

var port = process.env.PORT || 3000;

const app = express();
const http = createServer(app);
const io = sockets(http);


app.get('/', function(req, res){
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});
