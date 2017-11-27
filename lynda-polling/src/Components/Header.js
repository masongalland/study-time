import React, { Component } from "react";

export default class Header extends Component {
  static defaultProps = {
    status: "disconnected"
  };

  render() {
    return (
      <header>
        <h2>{this.props.title}</h2>
        <p>Presented by: {this.props.speaker}</p>
      </header>
    );
  }
}
