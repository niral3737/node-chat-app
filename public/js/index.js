let socket = io();

socket.on('connect', function() {
    console.log('Connected');
});

socket.on('newMessage', function (newMessage) {
    console.log('New Message', newMessage);
});

