import React, { Component } from "react";
import CardListBody from "./CardListBody";
import CardListHeader from "./CardListHeader";
import CardListFooter from "./CardListFooter";

export default class CardList extends Component {

  //   constructor(props) {
  //     super(props)
  //     this.state = {
  //         curPage: 1,
  //         curCardInfo: {},
  //         curCardIndex: 0,
  //         arrayData: [],
  //         txtSearch: '',
  //         isHeaderCheck: false,
  //     }
  // }

  state = {
    arrayData: [], // 카드리스트, 
    curPage: 1, // current Page 현재페이지
    curCardInfo: {}, // current CardInfo
    curCardIndex: 0, // current CaradIndex
    txtSearch: '',
    isHeaderCheck: false, // 전체 선택여부
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

  addCard = (type, dataInfo) => {
    let { arrayData } = this.state;
    let tempArray = arrayData;
    switch (type) {
      case 0: // 상단에 추가
        // add 된 카드에는 saveTp: 'added' 깂을 추가하고, param으로 넘어온 dataInfo 를 꾸조분해로 할당
        tempArray.unshift({ saveTp: 'added', ...dataInfo });
        break;
      case 1: // 하단에 추가
        tempArray.push({ saveTp: 'added', ...arrayData });
        break;
      default: break;
    }
  }

  render() {

    return (
      <div>
        <CardListHeader />
        <CardListBody />
        <CardListFooter />
      </div>
    )
  }


}


