$(document).ready(function () {
    
    var socket = io.connect('http://localhost:4000')
    var username = $("#username");
    var message = $("#message");
    var send = $("#send");
    var msg = $("#msg");
    send.click(function () {
        socket.emit('new_message',{message:message.val(),username:username.text()})
    })
    socket.on('new_message', (data) => {
        message.val('');
        msg.append('<p>' + data.username+'<br>'+data.message);
    })
    console.log( data.message);
})