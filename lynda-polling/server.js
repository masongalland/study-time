const express = require("express");

const app = express();

const server = app.listen(3005, () => console.log("listening on port 3005..."))
const io = require("socket.io").listen(server);

io.sockets.on("connection", (socket) => {
    console.log("connected: %s", socket.id);
})

