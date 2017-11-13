import React, { Component } from 'react';
import './App.css';
import io from 'socket.io-client'

class App extends Component {
  constructor(props) {
    super(props)
    this.connect = this.connect.bind(this)
  }
  

  
  componentWillMount() {
    this.socket = io("/");
    this.socket.on("connect", this.connect)
  }

  connect() {
    alert("connected: " + this.socket.id)
  }
  

  render() {
    return (
      <div className="App">
        
      </div>
    );
  }
}

export default App;
