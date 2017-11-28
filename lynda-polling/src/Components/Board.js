import React, { Component } from "react";
import Display from "./Display";

import {Bar} from 'react-chartjs-2';

export default class Board extends Component {
  render() {
    let data = {
      labels: Object.keys(this.props.results),
      datasets: [
        {
          backgroundColor: ["#23F0C7", "#4357AD", "#ffe426", "#D81159"],
          data: Object.values(this.props.results)
        }
      ]
    }
    let options = {
      legend: {display: false},
      scales: {xAxes: [{gridLines: {display: false}}]}
    }
    return (
      <div id="scoreboard">
        <Display
          if={this.props.status === "connected" && this.props.currentQuestion}
        >
          <Bar data={data} options={options}/>
        </Display>

        <Display if={this.props.status === 'connected' && !this.props.currentQuestion} >
            <h3>Awaiting a Question...</h3>
        </Display>
      </div>
    );
  }
}
