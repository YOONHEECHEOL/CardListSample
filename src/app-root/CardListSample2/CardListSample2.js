// CardList Component를 보여주는 예시 화면
import React, { Component } from "react";
import CardList from "./CardList";

export default class CardListSample2 extends Component {

  // ref
  myRef = {
    refCardList: React.createRef(), // <CardList /> 컴포넌트의 ref
  }

  // state
  state = {
    arrayInfo: [
      { groupCd: 'C1', groupNm: '전체', totCnt: '1435', amt: '95674000' },
      { groupCd: 'C2', groupNm: '영업그룹', totCnt: '357', amt: '16778233' },
      { groupCd: 'C3', groupNm: '컨설팅그룹', totCnt: '252', amt: '16778233' },
      { groupCd: 'C4', groupNm: '기타', totCnt: '164', amt: '10953315' },
      { groupCd: 'C5', groupNm: '유지보수그룹', totCnt: '164', amt: '10952362' },
      { groupCd: 'C6', groupNm: '개발그룹', totCnt: '136', amt: '9075428' },
      { groupCd: 'C7', groupNm: '경영관리그룹', totCnt: '104', amt: '6960670' }
    ], // 더미 데이터

    arrayCardView: [], // 현재 보여지고 있는 카드리스트
    intTotCnt: 0, // 전체선택 수
    srotTp: '1', // 정렬 기준값
    txtGroupNm: '' // 선택된 카드의 groupNm 값
  }

  /**
 * 고객사 정보 호출 함수
 * @param {string} sortTp 정렬구분 ('1': 이름순, '2': 등록순, '3': 수정순)
 * @param {boolean} isPaging 페이징 여부(true: 페이징 사용, false: 전체리스트)
 * @param {int} pagePerCnt 페이지당 보여줄 리스트 갯수
 * @param {int} curPage 현재 페이지번호
 * @returns 
 */
  // 이 메서드를 통해 데이터를 받아서 CardList 컴포넌트에 전달
  getDataInfo = (sortTp, txtSearch, isPaging, pagePerCnt, curPage) => {
    let { arrayInfo } = this.state; // let arrayInfo = this.state.arrayInfo; 
    let totCnt = 0;
    let tempArray = arrayInfo;
    let result = [];

    if (tempArray.length < 1) { // 더미데이터 값이 없을 경우 == 호출된 데이터 값이 없을 경우
      return { totCnt: totCnt, array: result };
    }

    // 전체 리스트를 tempArray에 복사 후, txtSearch(검색어)를 filter 해서 다시 선언
    // == 검색어가 포함된 리스트로 다시 선언
    tempArray = tempArray.filter(value => value.groupNm.indexOf(txtSearch) > -1);
    totCnt = tempArray.length; // 검색어가 포함된 배열의 길이값을 totCnt 값으로

    tempArray.sort(function (a, b) { // sort((a, b) => {...}), a = 앞에 값 / b = 뒤에 값
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
    // 제공된 getDataInfo 메서드를 통해 data 받아오기
    let { totCnt, array } = this.getDataInfo(sortTp, txtSearch, isPaging, pagePerCnt, curPage);
    // 받아온 data를 현재 페이지의 state 값으로 변경
    this.setState({
      arrayCardView: array,
      intTotCnt: totCnt,
      sortTp: sortTp,
    })
  }

  addCard = () => {
    // objCardInfo 변수에 
    let objCardInfo = { groupNm: this.state.txtGroupNm }; // 현재 선택된 카드의 groupNm값을 할당
    this.myRef.refCardList.current.addCard('0', objCardInfo); // <CardList /> 컴포넌트의 addCard 메서드를 사용
  }

  render() {
    return (
      <>
        <CardList ref={this.refCardList} />
      </>
    )
  }

}


