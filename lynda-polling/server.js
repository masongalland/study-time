const express = require("express");
const _ = require("underscore");

const app = express();
var connections = [];
var title = "Untitled Presentation";
var audience = [];
var speaker = {};

const server = app.listen(3005, () => console.log("listening on port 3005..."));
const io = require("socket.io").listen(server);

/////////////////---On Socket Connection---//////////

io.sockets.on("connection", socket => {
  socket.once("disconnect", function() {
    var member = _.findWhere(audience, { id: this.id });

    if (member) {
      audience.splice(audience.indexOf(member), 1);
      io.sockets.emit("audience", audience);
      console.log(
        "Left: %s (%s audience members)",
        member.name,
        audience.length
      );
    } else if(this.id === speaker.id) {
        console.log("%s has left. '%s' is over.", speaker.name, speaker.title);
        speaker = {};
        title = "Untitled Presentation";
        io.sockets.emit('end', { title: title, speaker: "" })
    }


    connections.splice(connections.indexOf(socket), 1);
    socket.disconnect();
    console.log("disconnected: %s sockets remaining", connections.length);
  });

  socket.on("join", function(payload) {
    const newMember = {
      id: this.id,
      name: payload.name,
      type: "member"
    };
    this.emit("joined", newMember);
    audience.push(newMember);
    io.sockets.emit("audience", audience);
    console.log("audience joined: %s", payload.name);
  });

  socket.on("start", function(payload) {
    speaker.name = payload.name;
    speaker.id = this.id;
    speaker.type = "speaker";
    title = payload.title
    this.emit("joined", speaker);
    io.sockets.emit('start', {title: title, speaker: speaker.name})
    console.log("Presentation Started: '%s' by %s", title, speaker.name);
  });

  socket.emit("welcome", {
    title: title,
    audience: audience,
    speaker: speaker.name
  });

  connections.push(socket);
  console.log("connected: %s sockets connected", connections.length);
});
