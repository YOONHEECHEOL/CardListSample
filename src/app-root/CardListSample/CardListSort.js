import React, { Component } from "react";

export default class CardListSort extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    drawSortItem = (dataInfo, index) => {
        return <div
            tabIndex={0}
            key={'sortItem_' + index} className="cardList_sortItem"
            style={{
                outline: 'none',
                border: this.props.sortTp == dataInfo.sortTp ? '1px solid #e6e6e6' : '1px solid #e6e6e6',
                backgroundColor: this.props.sortTp == dataInfo.sortTp ? '#46A3F0' : '#FAFAFA',
                textAlign: 'center',
                fontSize: '12px',
                padding: '2px',
                margin: '1px',
            }}
            onClick={() => {
                if (this.props.onClickSortItem) {
                    this.props.onClickSortItem(dataInfo)
                }
            }}>
            {dataInfo.sortNm}
        </div>
    }

    render() {
        return (
            <div

                className="cardList_sortList"
                style={{
                    position: 'relative',
                    top: '22px',
                    left: 'calc(100% - 130px)',
                    width: '60px',
                    display: 'inline-block',
                    border: '1px solid #e6e6e6',
                    backgroundColor: '#FAFAFA'
                }}
            >
                {
                    this.props.sortInfo.length > 0 ? this.props.sortInfo.map((data, index) => {
                        return this.drawSortItem(data, index);
                    }) :
                        undefined
                }
            </div>
        )
    }
}