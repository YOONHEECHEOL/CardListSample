import React, { Component } from "react";

export default class CardListBottom extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrayPageCnt: [],
        }
    }

    componentDidMount() {
        this.getPageArray(this.props.totCnt, this.props.pagePerCnt, this.props.curPage);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.totCnt != this.props.totCnt ||
            prevProps.pagePerCnt != this.props.pagePerCnt ||
            prevProps.curPage != this.props.curPage) {
            this.getPageArray(this.props.totCnt, this.props.pagePerCnt, this.props.curPage)
        }
    }

    getPageArray = (totCnt, pagePerCnt, curPage) => {
        let result = [];
        let intBlock = 5;
        let intTotCnt = parseInt(totCnt || 0);
        let intPagePerCnt = parseInt(pagePerCnt || 1);
        let intCutPage = parseInt(curPage || 0);

        // 마지막 페이지는 전체리스트 갯수에서 페이지당 갯수를 나웠을 때 값을 올림한 값
        let lastPage = Math.ceil(intTotCnt / intPagePerCnt);

        // 시작 페이지는 현재 페이지를 블록갯수만큼 나눴을 때 나머지값에서 하나적은 값을 제외한 수
        // ex) 현재페이지 :1 > 블록갯수 :5 > 나머지값에서 하나적은 값 : 0 > 시작페이지 : 1
        // ex) 현재페이지 :13 > 블록갯수 :5 > 나머지값에서 하나적은 값 : 2 > 시작페이지 : 11
        let startPage = intCutPage - (intCutPage % intBlock > 0 ? intCutPage % intBlock : intBlock) + 1;
        for (let i = 0; i < intBlock; i++) {
            if (startPage + i < lastPage + 1) {
                result.push(startPage + i);
            } else {
                break;
            }
        }

        this.setState({
            arrayPageCnt: result
        })
    }

    /**
     * 페이지 숫자 그리는 함수
     * @param {*} data 
     * @param {*} index 
     * @returns 
     */
    drawPage = (data, index) => {
        let intCutPage = parseInt(this.props.curPage || 0);
        return <div key={"page_" + index}
            style={{
                fontSize: '12px',
                display: 'inline-block',
                padding: '2px 4px',
                margin: '2px',
                color: intCutPage == data ? '#46A3F0' : '',
            }}
            onClick={() => {
                if (this.props.onClickPage) {
                    this.props.onClickPage(data);
                }
            }}
        >
            {data}
        </div>
    }


    /**
     * 첫페이지로 이동 버튼 이벤트
     */
    onClickFirst = () => {
        if (this.props.onClickPage) {
            this.props.onClickPage(1);
        }
    }

    /**
     * 마지막 페이지로 이동 버튼 이벤트
     */
    onClickLast = () => {
        let intPagePerCnt = parseInt(this.props.pagePerCnt || 1);
        let intTotCnt = parseInt(this.props.totCnt || 0);

        // 마지막 페이지는 전체리스트 갯수에서 페이지당 갯수를 나웠을 때 값을 올림한 값
        let lastPage = Math.ceil(intTotCnt / intPagePerCnt);
        if (this.props.onClickPage) {
            this.props.onClickPage(lastPage);
        }
    }

    /**
     * 이전 버튼 이벤트
     */
    onClickPre = () => {
        let intCutPage = parseInt(this.props.curPage || 0);
        if (intCutPage > 1) {
            if (this.props.onClickPage) {
                this.props.onClickPage(intCutPage - 1);
            }
        }
    }

    /**
     * 다음 버튼 이벤트
     */
    onClickNext = () => {
        let intCutPage = parseInt(this.props.curPage || 0);
        let intPagePerCnt = parseInt(this.props.pagePerCnt || 1);
        let intTotCnt = parseInt(this.props.totCnt || 0);

        // 마지막 페이지는 전체리스트 갯수에서 페이지당 갯수를 나웠을 때 값을 올림한 값
        let lastPage = Math.ceil(intTotCnt / intPagePerCnt);

        if (intCutPage + 1 <= lastPage) {
            if (this.props.onClickPage) {
                this.props.onClickPage(intCutPage + 1);
            }
        }
    }

    render() {
        return (
            <div className="cardList_bottom" style={{
                backgroundColor: '#FAFAFA', borderBottom: '1px solid #E6E6E6',
                height: '50px', width: '100%',
                display: this.props.isPaging ? '' : 'none'
            }}>
                <div className="cardList_pagging" style={{ position: 'relative', top: '30%', textAlign: 'center', }}>
                    {
                        this.state.arrayPageCnt.length > 0 ?
                            <div>
                                <button onClick={this.onClickFirst} style={{ marginRight: '2px' }}>{'<<'}</button>
                                <button onClick={this.onClickPre} style={{ marginRight: '2px' }}>{'<'}</button>
                                {
                                    this.state.arrayPageCnt.map((data, index) => {
                                        return this.drawPage(data, index);
                                    })
                                }
                                <button onClick={this.onClickNext} style={{ marginLeft: '2px' }}>{'>'}</button>
                                <button onClick={this.onClickLast} style={{ marginLeft: '2px' }}>{'>>'}</button>
                            </div>
                            : undefined
                    }
                </div>
            </div>
        )
    }
}