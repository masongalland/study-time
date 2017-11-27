const express = require("express");
const _ = require("underscore");

const app = express();
var connections = [];
var title = "";
var audience = [];
var speaker = {};
var questions = require('./app-questions');
var currentQuestion = false;
var results = {
    a: 0,
    b: 0,
    c: 0,
    d: 0
}

const server = app.listen(3005, () => console.log("listening on port 3005..."));
const io = require("socket.io").listen(server);

/////////////////---On Socket Connection---//////////

io.sockets.on("connection", socket => {
  socket.once("disconnect", function() {
    var member = _.findWhere(audience, { id: this.id });

    if (member) {
      audience.splice(audience.indexOf(member), 1);
      io.sockets.emit("audience", audience);
      console.log(`Left: ${member.name} (${audience.length} audience members)`);
    } else if(this.id === speaker.id) {
        console.log(`${speaker.name} has left. '${speaker.title}' is over.`);
        speaker = {};
        title = "Untitled Presentation";
        io.sockets.emit('end', { title: title, speaker: "" })
    }


    connections.splice(connections.indexOf(socket), 1);
    socket.disconnect();
    console.log(`disconnected: ${connections.length} sockets remaining`);
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
    console.log(`audience joined: ${payload.name}` );
  });

  socket.on("start", function(payload) {
    speaker.name = payload.name;
    speaker.id = this.id;
    speaker.type = "speaker";
    title = payload.title
    this.emit("joined", speaker);
    io.sockets.emit('start', {title: title, speaker: speaker.name})
    console.log(`Presentation Started: ${title} by ${speaker.name}`);
  });

  socket.on("ask", function(question){
      currentQuestion = question;
      results = {a:0, b:0, c:0, d:0}
      io.sockets.emit('ask', currentQuestion);
      console.log(`Question Asked: ${question.q}`)
  })

  socket.on("answer", function(payload) {
        results[payload.choice]++;
        io.sockets.emit('results', results);
        console.log(`Answer: ${payload.choice} -- ${JSON.stringify(results)}`)
        // io.sockets.emit('')
  })

  socket.emit("welcome", {
    title: title,
    audience: audience,
    speaker: speaker.name,
    questions: questions,
    currentQuestion: currentQuestion,
    results: results
  });

  connections.push(socket);
  console.log(`connected: ${connections.length} sockets connected`);
});
