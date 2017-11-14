import React, { Component } from "react";

export default class Join extends Component {
  constructor(props) {
    super(props);
    this.join = this.join.bind(this);
  }

  join() {
    const memberName = this.refs.name.value;
    this.props.emit('join', { name: memberName })
  }

  render() {
    return (
      <form action="javascript:void(0)" onSubmit={this.join}>
        <label>Full Name</label>
        <input
          className="form-control"
          placeholder="enter your full name..."
          ref="name"
          required
        />
        <button>Join</button>
      </form>
    );
  }
}
