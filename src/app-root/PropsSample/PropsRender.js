import React, { Component } from 'react';
import PropsSubRender from './PropsSubRender';

export default class PropsRender extends Component {

    state = {
        cnt1: 0,
        cnt2: 0,
    }

    onClick = () => {
        this.setState({
            cnt1: this.state.cnt1 + 1,
        });
    }

    onClickMain = () => {
        this.setState({
            cnt2: this.state.cnt2 + 1,
        });
    }

    render() {
        console.log("MainRenderIng");
        return (
            <div className="">
                <button onClick={this.onClick}> Props +1 </button>
                <button onClick={this.onClickMain}> Main +1 </button>
                <PropsSubRender text={this.state.cnt1} />
                <h1>Main Cnt : {this.state.cnt2}</h1>
            </div>
        );
    }

}