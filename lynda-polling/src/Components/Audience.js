import React, { Component } from 'react'
import Display from './Display'
import Join from './Join'


export default class Audience extends Component {
    render() {
        return (
            <div>
                <Display if={this.props.status === 'connected'} >
                    <h1>Join the session</h1>
                    <Join emit={this.props.emit}/>
                </Display>

            </div>
        )
    }
}
