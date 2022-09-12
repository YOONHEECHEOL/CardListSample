import React, { Component } from 'react';
import PropsSub1 from './PropsSub1';
import PropsSub2 from './PropsSub2';

export default class PropsInit extends Component {

    state = {

    }

    render() {
        return (
            <div className="">
                <PropsSub1 text="props1 값" />
                <PropsSub2 text="props2 값" />
            </div>
        );
    }

}