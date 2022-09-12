
import React, { Component } from 'react';

export default class LifeCycleTest extends Component {


    constructor(props) {
        console.log('constructor');
        super(props)
        this.state = {
            intCnt: 0,
        }
    }

    componentDidMount() {
        console.log('componentDidMount');
    }

    componentDidUpdate() {
        console.log('componentDidUpdate');
    }

    componentWillUnmount() {
        console.log('componentWillUnmount');
    }

    static getDerivedStateFromProps(props, state) {
        console.log('getDerivedStateFromProps');
        return null;
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('shouldComponentUpdate');
        return true;
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('getSnapshotBeforeUpdate');
        return null;
    }

    onClick = () => {
        this.setState({
            intCnt: this.state.intCnt + 1,
        });
    }

    render() {
        console.log('render');
        return (
            <div className="">
                <button onClick={this.onClick}> 데이터 수정 : {this.state.intCnt}</button>
            </div>
        );
    }

}