import React, { Component } from "react";
import {Link} from 'react-router-dom'

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
        <Link to="/speaker">Join as speaker</Link>
        <Link to="/board">Go to the board</Link>
      </form>
    );
  }
}
