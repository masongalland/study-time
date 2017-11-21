import React, { Component } from 'react'
import Display from './Display';
import JoinSpeaker from './JoinSpeaker';
import Attendance from './Attendance';
import Questions from './Questions';

export default class Speaker extends Component {
    render() {
        return (
            <div>
                <Display if={this.props.status === "connected"}>
                    <Display if={this.props.member.name && this.props.member.type === "speaker"} >
                        <Questions questions={this.props.questions} emit={this.props.emit} />
                        <Attendance audience={this.props.audience} />
                    </Display>

                    <Display if={!this.props.member.name} >
                        <h2>Start the presentation</h2>
                        <JoinSpeaker emit={this.props.emit}/>
                    </Display>

                </Display>
            </div>
        )
    }
}
