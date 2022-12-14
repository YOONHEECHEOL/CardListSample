import React, { Component } from "react";
import CardListSort from "./CardListSort";

export default class CardListHeader extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isOpenSort: false,
        }
    }

    timeStamp = 0;

    changeCommas = (number) => {
        let x = number || '0';
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    onClickSortOpen = () => {
        this.setState({
            isOpenSort: !this.state.isOpenSort
        })
    }

    onClickSortClose = () => {
        this.setState({
            isOpenSort: false
        })
    }

    onClickSortItem = (sortInfo) => {
        this.onClickSortClose();
        if (this.props.onClickSortItem) {
            this.props.onClickSortItem(sortInfo);
        }
    }

    closePopup = (arrayClass, callback) => {
        setTimeout(() => {
            const isParentEqualsThis = (parent) => {
                let className = parent.getAttribute('class') || '';
                let isCheck = false;
                arrayClass.map((item) => {
                    if (className.indexOf(item) > -1) {
                        isCheck = true;
                    }
                })
                if (isCheck) {
                    return true;
                } else if (parent.parentElement) {
                    return isParentEqualsThis(parent.parentElement);
                }
                return false;
            }
            if (!isParentEqualsThis(document.activeElement)) {
                if (callback) {
                    callback.call();
                }
            }
        }, 0);
    }

    getSortNm = () => {
        let result = '';

        if (this.props.sortInfo.length > 0) {
            for (let i = 0; i < this.props.sortInfo.length; i++) {
                if (this.props.sortInfo[i].sortTp == this.props.sortTp) {
                    result = this.props.sortInfo[i].sortNm;
                    break;
                }
            }
        }

        return result;
    }

    onChangeSearchTxt = (e) => {
        if (this.props.onChangeSearchTxt) {
            this.props.onChangeSearchTxt(e);
        }
    }

    onClickSearch = () => {
        if (this.props.onClickSearch) {
            this.props.onClickSearch(this.state.txtSearch);
        }
    }

    onEnterSearchTxt = (e) => {
        if (e.keyCode == 13 && e.timeStamp - this.timeStamp > 150) {
            this.timeStamp = e.timeStamp;
            this.onClickSearch();
        }
    }

    onClickHeaderCheck = () => {
        if (this.props.onClickHeaderCheck) {
            this.props.onClickHeaderCheck();
        }
    }

    render() {
        return (
            <div className="cardList_header"
                style={{
                    height: this.props.isSearch ? '60px' : '30px', width: '100%', backgroundColor: '#FAFAFA',
                    borderBottom: '1px solid #E6E6E6',
                }}>
                <div className="cardList_search" style={{ textAlign: 'center', padding: '5px 0px' }}>
                    <input
                        type="text"
                        placeholder={this.props.placeholder ? this.props.placeholder : '???????????? ??????????????????.'}
                        value={this.props.txtSearch}
                        onChange={this.onChangeSearchTxt}
                        onKeyUp={this.onEnterSearchTxt}
                        style={{ width: 'calc(80% - 20px)', marginRight: '2px' }}
                    />
                    <button onClick={this.onClickSearch} style={{ width: 'calc(20%)' }} >??????</button>
                </div>
                <div className="cardList_sort">
                    <div style={{ float: 'left', margin: '5px', fontSize: '14px' }}>
                        {
                            this.props.isHeaderCheckAble ?
                                <>
                                    <input readOnly={true} type="checkbox" style={{ marginRight: '6px' }} onClick={this.onClickHeaderCheck} checked={this.props.isHeaderCheck} /> ????????????
                                </>
                                :
                                <>??? : {this.changeCommas(this.props.totCnt)} ???</>
                        }
                    </div>
                    <div
                        tabIndex={0}
                        className="cardList_sortBtn"
                        style={{
                            outline: 'none',
                            float: 'right', margin: '5px 10px 0 0', fontSize: '14px'
                        }}
                        onBlur={e => {
                            // ?????????????????? ??? ????????? ???????????? ?????? ????????? ?????? ???????????? ??? ?????????
                            // ?????? ?????? ??????
                            let arrayClass = ['cardList_sortItem', 'cardList_sortList'];
                            this.closePopup(arrayClass, () => {
                                // ?????? ?????? ??????
                                this.onClickSortClose();
                            })
                        }}
                        onClick={this.onClickSortOpen}
                    >
                        {this.props.sortTp ? this.getSortNm() : '??????'}
                    </div>
                    {
                        this.state.isOpenSort ?
                            <CardListSort
                                sortInfo={this.props.sortInfo || []}
                                onClickSortItem={this.onClickSortItem}
                                sortTp={this.props.sortTp}
                            /> :
                            undefined
                    }
                </div>
            </div>
        )
    }
}