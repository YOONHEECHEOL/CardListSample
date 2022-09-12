import React, { Component } from 'react';
import Subject from './Component/Subject';

class StateInit1 extends Component {

    // 클래스 내부에 생성자 안에서 선언
    constructor(props) {
        super(props);
        this.state = {
            subject: { title: 'WEB', sub: '월드와이드웹! 초기화1' }
        }
    }

    render() {
        return (
            <div className="">
                <Subject title={this.state.subject.title} sub={this.state.subject.sub} >
                </Subject>
            </div>
        );
    }

}



export default StateInit1;