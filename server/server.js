/**
 * Created by niral on 14/12/16.
 */
'use strict'
const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;

const publicPath = path.join(__dirname, '../public');
let app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
   console.log('New Connection');
   console.log(socket.id);

   socket.emit('newMessage', {
      from: 'Admin',
       text: 'Welcome to the chat app',
       createdAt: new Date().getTime()
   });

   socket.broadcast.emit('newMessage', {
       from : 'Admin',
       text: 'New user joined',
       createdAt: new Date().getTime()
   });

   socket.on('createMessage', function (newMessage) {
       console.log(newMessage);
       io.emit('newMessage', {
           createdAt : new Date().getTime(),
           from : newMessage.from,
           text : newMessage.text
       });
   });

   socket.on('disconnect', function () {
        console.log('Disconnected');
   });

});

server.listen(port, () => {
    console.log(`App is up and running on ${port}`);
});