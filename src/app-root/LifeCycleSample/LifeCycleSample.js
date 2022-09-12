
import React, { Component } from 'react';
import LifeCycleTest from './LifeCycleTest';

export default class LifeCycleSample extends Component {

    state = {
        isCreate: false,

    }

    onClick = () => {
        this.setState({
            isCreate: !this.state.isCreate
        });
    }

    render() {
        return (
            <div className="">
                <button onClick={this.onClick}> {this.state.isCreate ? '삭제' : '생성'} </button>
                {
                    this.state.isCreate ? <LifeCycleTest />
                        : undefined
                }
            </div>
        );
    }

}