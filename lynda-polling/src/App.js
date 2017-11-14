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
      member: {}
    }

    this.connect = this.connect.bind(this)
    this.disconnect = this.disconnect.bind(this)
    this.welcome = this.welcome.bind(this)
    this.emit = this.emit.bind(this)
  }
  
  componentWillMount() {
    this.socket = io("/");
    this.socket.on("connect", this.connect)
    this.socket.on("disconnect", this.disconnect)
    this.socket.on("welcome", this.welcome)
  }

  emit(eventName, payload) {
    this.socket.emit(eventName, payload)
  }

  connect() {
    this.setState({status: "connected"})
    
  }

  disconnect(){
    console.log("i disconnected")
    this.setState({status: "disconnected"})
    
  }

  welcome(serverState){
    this.setState({title: serverState.title})
    
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
