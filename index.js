var express = require('express');
var socket = require('socket.io');
var app = express();

// makes our index.html able to view our html files
app.use(express.static('public'));

// we made sure that our server was able to reach out for a connection
var server = app.listen(3000);
var io = socket(server);


// now we actually make the connection from client to backend
io.sockets.on('connection', function(socket){
  // console.log('We have a new client: ' + socket.id);

  // this listens for the mouse emit from the client
  socket.on('mouse', function(data){
    console.log('recieved mouse' + data.x  + " " + data.y);
    // sends mouse to all the other clients
    socket.broadcast.emit('mouse', data);
  });
  socket.on('disconnect', function(){
    console.log("somebody left");
  })
});

// now we make the client or "front-end" reachout for a connection
// add a cnd script to your html find it on socket.io
