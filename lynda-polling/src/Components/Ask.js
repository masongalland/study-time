import React, { Component } from "react";
import Display from './Display'

export default class Ask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      choices: [],
      answer: undefined
    };
  }
  componentWillMount() {
    this.setUpChoices();
  }

  componentWillReceiveProps() {
    this.setUpChoices();
  }

  setUpChoices() {
    let choices = Object.keys(this.props.question);
    choices.shift();
    this.setState({ choices: choices, answer: sessionStorage.answer });
}

select(choice) {
    this.setState({answer: choice})
    sessionStorage.answer = choice;
    this.props.emit('answer', {
        question: this.props.question,
        choice: choice
    })
  }

  render() {
    const choices = this.state.choices.map((choice, i) => {
      return ( <button key={i} onClick={()=> this.select(choice)}>
                {choice}: {this.props.question[choice]}
               </button>
      )
    });

    return (
      <div id="currentQuestion">

        <Display if={this.state.answer}>
            <h3>You answered: {this.state.answer}</h3>
            <p>{this.props.question[this.state.answer]}</p>
        </Display>

        <Display if={!this.state.answer}>
            <h2>{this.props.question.q}</h2>
            <div>{choices}</div>
        </Display>

      </div>
    );
  }
}
