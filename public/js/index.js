let socket = io();

socket.on('connect', function() {
    console.log('Connected');
});

socket.on('newMessage', function (newMessage) {
    console.log('New Message', newMessage);

    let li = jQuery('<li></li>');
    li.text(`${newMessage.from}: ${newMessage.text}`);

    jQuery('#messages').append(li);
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

jQuery('#message-form').on('submit', function (e) {
   e.preventDefault();

   socket.emit('createMessage', {
       from: 'User',
       text: jQuery('[name=message]').val()
   }, function () {

   });
});