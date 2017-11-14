const express = require("express");

const app = express();
var connections = [];
var title = 'Untitled Presentation'

const server = app.listen(3005, () => console.log("listening on port 3005..."))
const io = require("socket.io").listen(server);

/////////////////---On Socket Connection---//////////

io.sockets.on("connection", (socket) => {

    socket.once('disconnect', () => {
        connections.splice(connections.indexOf(socket), 1)
        socket.disconnect();
        console.log('disconnected: %s sockets remaining', connections.length)
    })

    socket.emit('welcome', {title: title})

    connections.push(socket)
    console.log("connected: %s sockets connected", connections.length);
})

