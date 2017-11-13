import React, { Component } from "react";

export default class Header extends Component {
  static defaultProps = {
    status: "disconnected"
  };

  render() {
    return (
      <header>
        <h1>{this.props.title}</h1>
        <div id="connection-status" className={this.props.status}></div>
      </header>
    );
  }
}
