import React, { Component } from 'react';

class StateEdit1 extends Component {
    // 클래스 내부에 생성자 안에서 선언
    state = {
        number: 0
    }

    onIncrease = () => {
        let { number } = this.state;

        this.setState({
            number: number + 1,
        })
    }

    onDecrease = () => {
        let { number } = this.state;

        this.setState({
            number: number - 1,
        })
    }

    render() {
        /* 비구조 할당 */
        let { subject } = this.state;
        return (
            <div className="">
                <h1>{this.state.number}</h1>
                <button onClick={this.onIncrease}>+1</button>
                <button onClick={this.onDecrease}>-1</button>
            </div>
        );
    }

}



export default StateEdit1;