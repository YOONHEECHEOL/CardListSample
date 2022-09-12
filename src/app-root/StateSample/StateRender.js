import React, { Component } from 'react';

class StateRender extends Component {
    // 클래스 내부에 생성자 안에서 선언
    state = {
        number: 0
    }

    onIncrease1 = () => {
        let { number } = this.state;

        this.setState({
            number: number + 1,
        })
    }

    onIncrease2 = () => {
        let { number } = this.state;

        this.setState({
            number: number,
        })
    }

    onIncrease3 = () => {
        let { number } = this.state;
        this.state.number = number + 1;
    }

    onCheckNumber = () => {
        console.log('onCheckNumber : ', this.state.number);
    }



    render() {
        // 렌더링 발생 여부 체크
        console.log("rendering!! : ", this.state.number);
        return (
            <div className="">
                <h1>{this.state.number}</h1>
                <button onClick={this.onIncrease1}>Add_1</button>
                <button onClick={this.onIncrease2}>Add_2</button>
                <button onClick={this.onIncrease3}>Add_3</button>
                <button onClick={this.onCheckNumber}>CheckState</button>
            </div>
        );
    }

}



export default StateRender;