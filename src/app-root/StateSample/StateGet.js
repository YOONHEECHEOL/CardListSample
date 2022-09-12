import React, { Component } from 'react';
import Subject from './Component/Subject';

class StateGet extends Component {
    // 클래스 내부에 생성자 안에서 선언
    state = {
        subject: { title: 'WEB', sub: '월드와이드웹!' }
    }

    render() {
        /* 비구조 할당 */
        let { subject } = this.state;
        return (
            <div className="">
                {/* this.state.변수명으로 호출 */}
                <Subject title={this.state.subject.title} sub={subject.sub} >
                </Subject>
            </div>
        );
    }

}



export default StateGet;