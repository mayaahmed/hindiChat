'use strict';

let http = require('http');
let express = require('express');
let socketio = require('socket.io');

let app = express();
let server = http.createServer(app);
let io = socketio(server);

let users =[];
let connections = [];
app.use(express.static(__dirname + '/'));
server.listen(8080, () => console.log('Ready to work!'));

io.sockets.on('connection', function (socket) {

    //Connect
    connections.push(socket);
    console.log('Connected %s sockets', connections.length);
    
   // Disconnect
    socket.on('disconnect', function(){
         connections.splice(connections.indexOf(socket),1);
	users.splice(connections.indexOf(socket.username),1);
        console.log('Disconected: %s sockets connected', connections.length);
	updateUsers();

    });
   
//new User
    socket.on('new user', function(name){
	socket.username=name;
	console.log(socket.username); 
	users.push(socket.username);
	console.log('%s sockets users', users.length);
	updateUsers();

    }); 

    socket.on('new message', function(name, message){
        console.log(message);
       io.sockets.emit('display message', name,  message);
    });

function updateUsers(){
io.sockets.emit('display users', users);
}

});








