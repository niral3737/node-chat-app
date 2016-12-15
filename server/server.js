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
const {generateMessage} = require('./utils/message');

app.use(express.static(publicPath));

io.on('connection', (socket) => {
   console.log('New Connection');
   console.log(socket.id);

   socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

   socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User joined'));

   socket.on('createMessage', function (newMessage, callback) {
       console.log(newMessage);
       io.emit('newMessage', generateMessage(newMessage.from, newMessage.text));
       callback('this is from the server');
   });

   socket.on('disconnect', function () {
        console.log('Disconnected');
   });

});

server.listen(port, () => {
    console.log(`App is up and running on ${port}`);
});