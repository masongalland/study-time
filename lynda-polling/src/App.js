import React, { Component } from 'react';
import './App.css';

import io from 'socket.io-client';

import Router from './router'
import Header from "./Components/Header"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      status: "disconnected",
      title: "",
      member: {},
      audience: []
    }

    this.connect = this.connect.bind(this)
    this.disconnect = this.disconnect.bind(this)
    this.welcome = this.welcome.bind(this)
    this.emit = this.emit.bind(this)
    this.joined = this.joined.bind(this)
    this.updateAudience = this.updateAudience.bind(this)
  }
  
  componentWillMount() {
    this.socket = io("/");
    this.socket.on("connect", this.connect)
    this.socket.on("disconnect", this.disconnect)
    this.socket.on("welcome", this.welcome)
    this.socket.on('joined', this.joined)
    this.socket.on('audience', this.updateAudience)
  }

  emit(eventName, payload) {
    this.socket.emit(eventName, payload)
  }

  connect() {
    let member = (sessionStorage.member) ? JSON.parse(sessionStorage.member) : null

    if(member) {
      this.emit("join", member)
    }

    this.setState({status: "connected"})
    
  }

  disconnect(){
    console.log("i disconnected")
    this.setState({status: "disconnected"})
    
  }

  welcome(serverState){
    this.setState({title: serverState.title})
    
  }

  joined (member) {
    sessionStorage.member = JSON.stringify(member)
    this.setState({member})
    
  }

  updateAudience(newAudience) {
    this.setState({audience: newAudience})
    
  }

  render() {
    console.log(this.state)
    return (
      <div className="App">
        <Header title={this.state.title} status={this.state.status}/>
        <Router emit={this.emit} {...this.state}/>
      </div>
    );
  }
}

export default App;
