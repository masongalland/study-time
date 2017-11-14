const express = require("express");

const app = express();
var connections = [];
var title = 'Untitled Presentation';
var audience = [];

const server = app.listen(3005, () => console.log("listening on port 3005..."))
const io = require("socket.io").listen(server);

/////////////////---On Socket Connection---//////////

io.sockets.on("connection", (socket) => {

    socket.once('disconnect', () => {
        connections.splice(connections.indexOf(socket), 1)
        socket.disconnect();
        console.log('disconnected: %s sockets remaining', connections.length)
    })

    socket.on('join', function(payload) {
        const newMember = {
            id: this.id,
            name: payload.name
        };
        this.emit('joined', newMember);
        audience.push(newMember);
        io.sockets.emit('audience', audience);
        console.log("audience joined: %s", payload.name)
    })

    socket.emit('welcome', {title: title})

    connections.push(socket)
    console.log("connected: %s sockets connected", connections.length);
})

