import React, { Component } from "react";
import Display from "./Display";
import Join from "./Join";
import Ask from "./Ask";

export default class Audience extends Component {
  render() {
    return (
      <div id="audience">
        <Display if={this.props.status === "connected"}>
          <Display if={this.props.member.name}>
            <Display if={!this.props.currentQuestion}>
              <h2>Welcome {this.props.member.name}</h2>
              <p> {this.props.audience.length} audience members connected</p>
              <p>Questions will appear here.</p>
            </Display>

            <Display if={this.props.currentQuestion}>
              <Ask question={this.props.currentQuestion} emit={this.props.emit}/>
            </Display>
          </Display>

          <Display if={!this.props.member.name}>
            <h1 class="home">Join!</h1>
            <Join emit={this.props.emit} />
          </Display>
        </Display>
      </div>
    );
  }
}
