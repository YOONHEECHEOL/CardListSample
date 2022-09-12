import React, { Component } from "react";
import CardListHeader from "./CardListHeader";
import CardListBody from "./CardListBody";
import CardListBottom from "./CardListBottom";

export default class CardList extends Component {


    constructor(props) {
        super(props)
        this.state = {
            curPage: 1,
            curCardInfo: {},
            curCardIndex: 0,
            arrayData: [],
            txtSearch: '',
            isHeaderCheck: false,
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.arrayData != this.props.arrayData) {
            this.setState({
                curCardIndex: 0,
                curCardInfo: this.props.arrayData.length > 0 ? this.props.arrayData[0] : {},
                arrayData: this.props.arrayData
            }, () => {
                if (this.props.arrayData.length > 0) {
                    this.props.onClickData(this.props.arrayData[0]);
                }
            })
        }
    }

    onRead = () => {
        if (this.props.getArray) {
            this.setState({
                curPage: 1,
                curCardInfo: {},
                curCardIndex: 0,
                arrayData: [],
                txtSearch: '',
            }, () => {
                this.props.getArray({
                    sortTp: this.props.sortTp,
                    isPaging: this.props.isPaging,
                    pagePerCnt: this.props.pagePerCnt,
                    curPage: this.state.curPage,
                    txtSearch: this.state.txtSearch
                });
            });
        }
    }

    onClickSortItem = (sortInfo) => {
        if (this.props.getArray) {
            this.props.getArray({
                sortTp: sortInfo.sortTp,
                isPaging: this.props.isPaging,
                pagePerCnt: this.props.pagePerCnt,
                curPage: this.state.curPage,
                txtSearch: this.state.txtSearch
            });
        }
    }

    onClickCarditem = (cardInfo, index) => {
        this.setState({
            curCardInfo: cardInfo,
            curCardIndex: index
        }, () => {
            if (this.props.onClickData) {
                this.props.onClickData(cardInfo);
            }
        })

    }

    onClickPage = (page) => {
        this.setState({
            curPage: page,
            curCardIndex: 0,
        }, () => {
            if (this.props.getArray) {
                this.props.getArray({
                    sortTp: this.props.sortTp,
                    isPaging: this.props.isPaging,
                    pagePerCnt: this.props.pagePerCnt,
                    curPage: page,
                    txtSearch: this.state.txtSearch
                });
            }
        })
    }

    getSelectedIndex = () => {
        return this.state.curCardIndex;
    }

    getSelectedData = () => {
        return this.state.curCardInfo;
    }

    getCardList = (arraySaveTp) => {
        let { arrayData } = this.state;
        let result = [];
        if (arraySaveTp.length > 0) {
            result = arrayData.filter((dataInfo) => {
                let result = arraySaveTp.some((saveTp) => {
                    let isCheck = false;
                    if (saveTp == 'none') {
                        isCheck = true;
                    } else if (dataInfo.saveTp == saveTp) {
                        isCheck = true;
                    }
                    return isCheck;
                });
                return result;
            });
        } else {
            result = arrayData;
        }

        return result;
    }

    addCard = (type, dataInfo) => {
        let { arrayData } = this.state;
        let tempArray = arrayData;
        switch (type) {
            case '0':// 상단에 추가
                tempArray.unshift({ saveTp: 'added', ...dataInfo })
                break;
            case '1':// 하단에 추가
                tempArray.push({ saveTp: 'added', ...dataInfo })
                break;
        }

        this.setState({
            arrayData: tempArray
        })
    }

    updateCard = (index, dataInfo) => {
        let { arrayData } = this.state;
        let tempArray = arrayData;
        tempArray[index] = dataInfo;
        if (tempArray[index].saveTp !== 'added') {
            tempArray[index].saveTp = 'updated';
        }

        this.setState({
            arrayData: tempArray
        })

    }

    deleteCard = (index) => {
        let { arrayData } = this.state;
        let tempArray = arrayData;
        if (tempArray[index].saveTp == 'added') {
            tempArray.splice(index, 1);
        } else {
            tempArray[index].saveTp = 'deleted';
        }
        this.setState({
            arrayData: tempArray
        })
    }

    onClickSearch = () => {
        this.props.getArray({
            sortTp: this.props.sortTp,
            isPaging: this.props.isPaging,
            pagePerCnt: this.props.pagePerCnt,
            curPage: this.state.curPage,
            txtSearch: this.state.txtSearch
        });
    }

    onChangeSearchTxt = (e) => {
        this.setState({
            txtSearch: e.target.value,
        })
    }

    onClickHeaderCheck = () => {
        let { isHeaderCheck, arrayData } = this.state;

        let tempArray = arrayData;

        tempArray = tempArray.map((value) => {
            value.isCheck = !isHeaderCheck;
            return value;
        })

        this.setState({
            isHeaderCheck: !isHeaderCheck,
            arrayData: tempArray,
        })
    }

    onClickCheckBox = (checkInfo) => {
        let { index } = checkInfo;
        let { arrayData, isHeaderCheck } = this.state;
        let tempArray = arrayData;
        let state = {};


        tempArray[index].isCheck = !tempArray[index].isCheck;
        state.arrayData = tempArray;

        if (tempArray[index].isCheck) {
            // check 값이 true 일경우, 헤더 체크 확인
            let isCheckedAll = true;
            for (let index in tempArray) {
                if (!tempArray[index].isCheck) {
                    isCheckedAll = false;
                    break;
                }
            }
            if (isCheckedAll) {
                state.isHeaderCheck = true;
            }
        } else {
            // check 값이 false 일경우, 헤더가 true > false로 변경
            if (isHeaderCheck) {
                state.isHeaderCheck = false;
            }
        }

        this.setState(state);
    }

    getCheckedIndex = () => {
        let { arrayData } = this.state;
        let result = [];
        if (arrayData.length > 0) {
            for (let i = 0; i < arrayData.length; i++) {
                let item = arrayData[i];
                if (item.isCheck) {
                    result.push(i);
                }
            }
        } else {
            result = arrayData;
        }

        return result;
    }

    getCheckedData = () => {
        let { arrayData } = this.state;
        let result = [];
        if (arrayData.length > 0) {
            for (let i = 0; i < arrayData.length; i++) {
                let item = arrayData[i];
                if (item.isCheck) {
                    result.push(item);
                }
            }
        } else {
            result = arrayData;
        }

        return result;
    }

    getDataInfo = (index) => {
        let { arrayData } = this.state;
        return arrayData[index];
    }

    onHeaderCheck = (isCheck) => {
        let { arrayData } = this.state;
        let tempArray = arrayData;
        tempArray = tempArray.map((value) => {
            value.isCheck = isCheck ? isCheck : false;
            return value;
        })
        this.setState({
            isHeaderCheck: isCheck ? isCheck : false,
            arrayData: tempArray,
        })
    }

    render() {
        return (
            <div className="cardListComponent"
                style={{
                    width: this.props.width ? this.props.width : '100%',
                    height: this.props.height ? this.props.height : '100%',
                    backgroundColor: '#FAFAFA', border: '1px solid #e6e6e6'
                }}>
                <CardListHeader
                    // 검색영역관련
                    isSearch={this.props.isSearch}
                    txtSearch={this.state.txtSearch}
                    onChangeSearchTxt={this.onChangeSearchTxt}
                    onClickSearch={this.onClickSearch}
                    placeholder={this.props.placeholder}

                    // 체크박스 관련
                    isHeaderCheckAble={this.props.isHeaderCheckAble || false}
                    isHeaderCheck={this.state.isHeaderCheck}
                    onClickHeaderCheck={this.onClickHeaderCheck}
                    // 전체 카운트
                    totCnt={this.props.totCnt}

                    // 정렬관련
                    sortInfo={this.props.sortInfo || []}
                    onClickSortItem={this.onClickSortItem}
                    sortTp={this.props.sortTp}
                />
                <CardListBody
                    // 페이징 또는 검색영역 사용할 경우 사이즈 조절
                    isPaging={this.props.isPaging}
                    isSearch={this.props.isSearch}
                    // 데이터 관련
                    arrayData={this.state.arrayData || []}
                    cardView={this.props.cardView}

                    // 체크박스 관련
                    isHeaderCheckAble={this.props.isHeaderCheckAble || false}
                    isHeaderCheck={this.state.isHeaderCheck}
                    isCheckAble={this.props.isCheckAble || false}
                    onClickCheckBox={this.onClickCheckBox}

                    // 이벤트 관련
                    onClickCarditem={this.onClickCarditem}
                    curCardIndex={this.state.curCardIndex}
                />
                <CardListBottom
                    // 페이징 관련 
                    isPaging={this.props.isPaging}
                    totCnt={this.props.totCnt}
                    pagePerCnt={this.props.pagePerCnt}
                    curPage={this.state.curPage}
                    onClickPage={this.onClickPage}
                />
            </div>
        );
    }
}