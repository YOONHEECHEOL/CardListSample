import React, { Component } from 'react';

export default class PropsSub1 extends Component {

    state = {

    }



    render() {
        return (
            <div className="">
                {this.props.text}
                <button onClick={() => {
                    if (this.props.onClick) {
                        this.props.onClick();
                    }
                }} style={{ display: this.props.onClick ? '' : 'none' }}> Add +1 </button>
            </div>
        );
    }

}