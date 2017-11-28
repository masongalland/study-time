import React, { Component } from "react";

export default class Attendance extends Component {
  render() {
    const members = this.props.audience.map((member, i) => {
      return (
        <tr key={i}>
          <td>{member.name}</td>
          <td>{member.id}</td>
        </tr>
      );
    });

    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Audience Member</th>
              <th>Socket ID</th>
            </tr>
          </thead>
          <tbody>{members}</tbody>
        </table>
      </div>
    );
  }
}
