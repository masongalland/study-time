import React, { Component } from "react";

export default class Header extends Component {
  static defaultProps = {
    status: "disconnected"
  };

  render() {
    return (
      <header>
        <h2>{this.props.title}</h2>
        <p>{this.props.speaker}</p>
        <div id="connection-status" className={this.props.status}></div>
      </header>
    );
  }
}
