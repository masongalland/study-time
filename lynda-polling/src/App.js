import React, { Component } from 'react';
import './App.css';
import io from 'socket.io-client'

import Header from "./Components/Header"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      status: "disconnected"
    }

    this.connect = this.connect.bind(this)
  }
  

  
  componentDidMount() {
    this.socket = io("/");
    this.socket.on("connect", this.connect)
  }

  connect() {
    this.setState({status: "connected"})
    
  }
  

  render() {
    return (
      <div className="App">
        <Header title="New Header" status={this.state.status}/>
      </div>
    );
  }
}

export default App;
