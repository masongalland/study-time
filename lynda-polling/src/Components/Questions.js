import React, { Component } from 'react'

export default class Questions extends Component {

    ask(question) {
        this.props.emit('ask', question);
    }

    render() {

        const questions = this.props.questions.map((question, i) => {
            return (
                <div key={i}>
                    <span onClick={() => this.ask(question)}>{question.q}</span>
                </div>
            )
        })

        return (
            <div id="questions">
                <h2>Questions</h2>
                {questions}
            </div>
        )
    }
}
