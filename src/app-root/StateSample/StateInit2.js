import React, { Component } from 'react';
import Subject from './Component/Subject';

class StateInit2 extends Component {

    // 클래스 내부에 객체 형태로 선언
    state = {
        subject: { title: 'WEB', sub: '월드와이드웹! 초기화2' }
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



export default StateInit2;