import React, { Component } from "react";

export default class JoinSpeaker extends Component {
  constructor(props) {
    super(props);
    this.start = this.start.bind(this);
  }

  start() {
    const speakerName = this.refs.name.value;
    const title = this.refs.title.value;
    this.props.emit('start', {name: speakerName, title: title})
  }

  render() {
    return (
      <form action="javascript:void(0)" onSubmit={this.start}>
        <label>Full Name</label>
        <input
          className="form-control"
          placeholder="enter your full name..."
          ref="name"
          required
        />

        <label>Presentation Title</label>
        <input
          className="form-control"
          placeholder="enter a title for this presentation..."
          ref="title"
          required
        />
        <button>Join</button>
      </form>
    );
  }
}