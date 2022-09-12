import React, { Component } from 'react';
import PropsSub1 from './PropsSub1';

export default class PropsEdit extends Component {

    state = {
        cnt: 0
    }

    onClick = () => {
        this.setState({
            cnt: this.state.cnt + 1,
        });
    }

    render() {
        return (
            <div className="">
                <PropsSub1 text={this.state.cnt} onClick={this.onClick} />
            </div>
        );
    }

}