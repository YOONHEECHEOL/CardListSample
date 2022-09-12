import React, { Component } from "react";
import CardList from "./CardList";

export default class CardListSample extends Component {

    myRef = {
        refCardList: React.createRef()
    }

    state = {
        arrayInfo: [
            { groupCd: 'C1', groupNm: '전체', totCnt: '1435', amt: '95674000' },
            { groupCd: 'C2', groupNm: '영업그룹', totCnt: '357', amt: '16778233' },
            { groupCd: 'C3', groupNm: '컨설팅그룹', totCnt: '252', amt: '16778233' },
            { groupCd: 'C4', groupNm: '기타', totCnt: '164', amt: '10953315' },
            { groupCd: 'C5', groupNm: '유지보수그룹', totCnt: '164', amt: '10952362' },
            { groupCd: 'C6', groupNm: '개발그룹', totCnt: '136', amt: '9075428' },
            { groupCd: 'C7', groupNm: '경영관리그룹', totCnt: '104', amt: '6960670' }
        ],

        arrayCardView: [],
        intTotCnt: 0,
        sortTp: '1',
        txtGroupNm: '',
    }

    componentDidMount() {
        this.myRef.refCardList.current.onRead();
    }

    /**
     * 고객사 정보 호출 함수
     * @param {string} sortTp 정렬구분 ('1': 이름순, '2': 등록순, '3': 수정순)
     * @param {boolean} isPaging 페이징 여부(true: 페이징 사용, false: 전체리스트)
     * @param {int} pagePerCnt 페이지당 보여줄 리스트 갯수
     * @param {int} curPage 현재 페이지번호
     * @returns 
     */
    getDataInfo = (sortTp, txtSearch, isPaging, pagePerCnt, curPage) => {
        let { arrayInfo } = this.state;
        let totCnt = 0;
        let tempArray = arrayInfo;
        let result = [];

        if (tempArray.length < 1) {
            return { totCnt: totCnt, array: result };
        }

        tempArray = tempArray.filter(value => value.groupNm.indexOf(txtSearch) > -1);
        totCnt = tempArray.length;

        tempArray.sort(function (a, b) {
            // 회사명 오름차순
            if (sortTp === '1') {
                if (a.groupNm > b.groupNm) return 1;
                if (a.groupNm < b.groupNm) return -1;
                if (a.groupNm = b.groupNm) return 0;
            } else if (sortTp === '2') {
                // 등록순 내림차순
                if (a.groupCd < b.groupCd) return 1;
                if (a.groupCd > b.groupCd) return -1;
                if (a.groupCd = b.groupCd) return 0;
            } else if (sortTp === '3') {
                // 수정순 오름차순
                if (a.groupCd > b.groupCd) return 1;
                if (a.groupCd < b.groupCd) return -1;
                if (a.groupCd = b.groupCd) return 0;
            } else {
                return 0;
            }
        })

        if (isPaging) {
            let intCurPage = parseInt(curPage || 0);
            let intPagePerCnt = parseInt(pagePerCnt || 0);
            let intStart = 0;
            if (intCurPage > 0) {
                intStart = (intCurPage - 1) * intPagePerCnt;
            } else {
                return { totCnt: 0, array: [] }
            }

            for (let i = 0; i < intPagePerCnt; i++) {
                let intIndex = intStart + i;
                if (intIndex < totCnt) {
                    result.push(tempArray[intIndex]);
                } else {
                    break;
                }
            }
        } else {
            result = tempArray;
        }
        return { totCnt: totCnt, array: result };

    }

    onChangeArray = (sortTp, txtSearch, isPaging, pagePerCnt, curPage) => {
        let { totCnt, array } = this.getDataInfo(sortTp, txtSearch, isPaging, pagePerCnt, curPage);
        this.setState({
            arrayCardView: array,
            intTotCnt: totCnt,
            sortTp: sortTp,
        })
    }

    addCard = () => {
        let objCardInfo = { groupNm: this.state.txtGroupNm };
        this.myRef.refCardList.current.addCard('0', objCardInfo);
    }

    updateCard = () => {
        let index = this.myRef.refCardList.current.getSelectedIndex();
        let objCardInfo = this.myRef.refCardList.current.getSelectedData();
        this.myRef.refCardList.current.updateCard(index, { ...objCardInfo, groupNm: this.state.txtGroupNm });
    }

    deleteCard = () => {
        let index = this.myRef.refCardList.current.getSelectedIndex();
        this.myRef.refCardList.current.deleteCard(index);
    }

    onChangeGroupNm = (e) => {
        this.setState({
            txtGroupNm: e.target.value
        })
    }

    onClickGetCardlist = (type) => {
        switch (type) {
            case 'A':
                console.log("전체값 조회: ", this.myRef.refCardList.current.getCardList([]));
                break;
            case 'I':
                console.log("추가값 조회: ", this.myRef.refCardList.current.getCardList(['added']));
                break;
            case 'U':
                console.log("수정값 조회: ", this.myRef.refCardList.current.getCardList(['updated']));
                break;
            case 'D':
                console.log("삭제값 조회: ", this.myRef.refCardList.current.getCardList(['deleted']));
                break;
        }

    }

    changeCommas = (number) => {
        let x = number || '0';
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    render() {
        return (
            <div className="">
                <div style={{ width: '500px', height: '800px', marginTop: '50px', marginLeft: '50px', display: 'inline-block' }}>
                    <CardList
                        width={"300px"}
                        ref={this.myRef.refCardList}

                        // 검색영역관련
                        isSearch={true}
                        placeholder={"그룹명으로 검색하세요."}

                        // 체크박스 관련
                        isCheckAble={true}
                        isHeaderCheckAble={true}

                        // 정렬관련
                        sortTp={this.state.sortTp}
                        sortInfo={[
                            { sortNm: '등록순', sortTp: '2' },
                            { sortNm: '수정순', sortTp: '3' },
                            { sortNm: '이름순', sortTp: '1' },
                        ]}

                        // 카드 형태 관련 
                        cardView={(data, checkbox) => {
                            let { groupNm, groupCd, amt, totCnt } = data;
                            return (
                                <div className="cardlist_card" style={{ width: '100%', height: '100%' }}>
                                    <div className="card_left" style={{
                                        display: 'inline-block',
                                        width: '60%', height: '100%',
                                        float: 'left'
                                    }}>
                                        <div style={{ top: '40%', position: 'relative' }}>
                                            {checkbox}
                                            {groupNm}
                                        </div>
                                    </div>
                                    <div className="card_right" style={{
                                        display: 'inline-block',
                                        width: '40%', height: '100%'
                                    }}>
                                        <div style={{ float: 'right', width: '100%', textAlign: 'right', marginTop: '5px', height: '50%' }}>{this.changeCommas(totCnt)}건</div>
                                        <div style={{ float: 'right', width: '100%', textAlign: 'right' }}>{this.changeCommas(amt)}원</div>
                                    </div>
                                </div>
                            );
                        }}

                        // 페이징 관련
                        isPaging={false}
                        pagePerCnt={7}
                        totCnt={this.state.intTotCnt}

                        // 데이터 조회
                        arrayData={this.state.arrayCardView}
                        getArray={({ sortTp, isPaging, pagePerCnt, curPage, txtSearch }) => {
                            this.onChangeArray(sortTp, txtSearch, isPaging, pagePerCnt, curPage);
                        }}

                        // 클릭이벤트 
                        onClickData={(dataInfo) => {
                            this.setState({
                                txtGroupNm: dataInfo.groupNm
                            })
                        }}
                    />
                </div>
                <div style={{ width: '500px', height: '800px', marginTop: '50px', marginLeft: '50px', display: 'inline-block' }}>
                    <input type={'text'} onChange={this.onChangeGroupNm} placeholder="고객사명" value={this.state.txtGroupNm} />
                    <button onClick={this.addCard}>추가</button>
                    <button onClick={this.updateCard}>수정</button>
                    <button onClick={this.deleteCard}>삭제</button>
                    <br />
                    <button onClick={() => {
                        this.onClickGetCardlist('A');
                    }}>전체조회</button>
                    <button onClick={() => {
                        this.onClickGetCardlist('I');
                    }}>추가조회</button>
                    <button onClick={() => {
                        this.onClickGetCardlist('U');
                    }}>수정조회</button>
                    <button onClick={() => {
                        this.onClickGetCardlist('D');
                    }}>삭제조회</button>
                    <br />
                    <button onClick={() => {
                        this.myRef.refCardList.current.onHeaderCheck(false);
                    }}>헤더체크</button>
                    <button onClick={() => {
                        console.log(this.myRef.refCardList.current.getCheckedIndex());
                    }}>체크 인덱스 리스트</button>
                    <button onClick={() => {
                        console.log(this.myRef.refCardList.current.getCheckedData());
                    }}>체크 데이터 리스트</button>

                </div>
            </div>
        );
    }
}