import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client'

class App extends Component {

  
  componentDidMount() {
    this.socket = io("/");
    this.socket.on("connect", this.connect)
  }

  connect() {
    alert("connected: ")
  }
  

  render() {
    return (
      <div className="App">
        
      </div>
    );
  }
}

export default App;
