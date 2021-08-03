// import the dependencies
const express = require('express')
var bodyParser = require('body-parser');
//starting the express server
const app = express()

//To tell express that we are using the public folder
app.use(express.static('public'))
app.use(bodyParser());

app.set('view engine', "ejs")
app.get('/', (req, res) => {
    res.render('index')
})

app.post('/', (req, res) => {
    var user = req.body.user
    res.render('chatbox',{ username: user })
});

const server= app.listen(4000, () => {
    console.log("server is listening on port 4000")
})

//including socket.io
const io = require('socket.io')(server)

//events
// on () fires whenever a new client is connected
io.on('connection', (socket) => {
    console.log("A new client has been connected");
    
    socket.on('new_message', (data) => {
        socket.username = data.username;
        io.sockets.emit('new_message',{message:data.message,username:socket.username})
    })
})
