import React, { Component } from 'react';

export default class PropsSubRender extends Component {

    constructor(props) {
        super(props)
        this.state = {
            text: props.text,
            isRender: true
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        /**
         * 현재 저장된 text와 들어온 text값이 다르면서
         * 렌더링여부가 N인경우, 값을 변경하지 않음
         */
        if (nextState.text != nextProps.text && !nextState.isRender) {
            return false;
        } else {
            return true;
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.text !== this.props.text) {
            this.setState({ text: this.props.text });
        }
    }

    onClick = () => {
        this.setState({
            isRender: !this.state.isRender
        })
    }

    render() {
        console.log("SubRenderIng");
        return (
            <div className="">
                <h1>props 값 : {this.state.text}</h1>
                <button onClick={this.onClick} > Render On/Off : {this.state.isRender ? 'On' : 'Off'}</button>
            </div>
        );
    }

}