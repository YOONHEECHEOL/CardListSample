import React, { Component } from "react";

export default class CardListBody extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    drawItem = (data) => {
        return <div key={data.key} className="" >
            {data.custNm}
        </div>
    }

    drawItemContain = (data) => {
        return <div key={data.key}
            className="cardList_item"
            style={{
                border: this.props.curCardIndex == data.index ? '1px solid #46A3F0' : '1px solid #e6e6e6',
                borderRadius: '5px',
                width: 'calc(100% - 20px)',
                height: '60px',
                marginLeft: '5px',
                marginBottom: '5px',
                padding: '5px',
            }}
            onClick={() => {
                if (this.props.onClickCarditem) {
                    this.props.onClickCarditem(data, data.index);
                }
            }}
        >
            {this.props.cardView ? this.props.cardView(data, this.onCheckBox(data)) : this.drawItem(data)}
        </div>
    }

    onCheckBox = (dataInfo) => {
        return <input readOnly={true} type={'checkbox'} onClick={() => { this.onClickCheckBox(dataInfo) }} checked={dataInfo.isCheck ? dataInfo.isCheck : false} />
    }

    onClickCheckBox = (dataInfo) => {
        if (this.props.onClickCheckBox) {
            this.props.onClickCheckBox(dataInfo);
        }
    }

    drawDataNone = () => {
        return <div style={{ height: '100%' }}>
            <div className="cardList_item_none" style={{ top: '50%', textAlign: 'center', position: 'relative' }}>
                조회된 데이터가 없습니다.
            </div>
        </div>;
    }

    render() {
        let pageH = this.props.isPaging ? 50 : 0;
        let searchH = this.props.isSearch ? 30 : 0;
        let removeH = 30 + pageH + searchH;
        return (
            <div className="cardList_body" style={{
                backgroundColor: '#FAFAFA', borderBottom: '1px solid #E6E6E6',
                width: '100%', height: `calc( 100% - ${removeH}px )`,
                overflow: 'scroll'
            }}>
                {
                    this.props.arrayData.length > 0 ?
                        this.props.arrayData.map((data, index) => {
                            data.key = "cardList_i" + index;
                            data.index = index;
                            if (data.saveTp !== 'deleted') {
                                return this.drawItemContain(data);
                            }
                        }) : this.drawDataNone()
                }

            </div>
        )
    }
}