import React, { Component } from "react";
import Display from "./Display";

export default class Board extends Component {
  render() {
      console.log(this.props)
    return (
      <div id="scoreboard">
        <Display
          if={this.props.status === "connected" && this.props.currentQuestion}
        >
          <h3> {this.props.currentQuestion.q}</h3>
          <p>{JSON.stringify(this.props.results)}</p>
        </Display>

        <Display if={this.props.status === 'connected' && !this.props.currentQuestion} >
            <h3>Awaiting a Question...</h3>
        </Display>
      </div>
    );
  }
}
