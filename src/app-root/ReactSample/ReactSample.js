import React, { Component } from 'react';
import LogoView from './LogoView';
import SectionView from './SectionView';

export default class ReactSample extends Component {

    state = {

    }

    render() {
        return (
            <div className="">
                <LogoView />
                <NavView />
                <SectionView text="Hello world!" />
            </div>
        );
    }

}

/**
 * 메뉴보기
 * @param {*} text 메뉴명
 * @returns 
 */
const MenuView = ({ text }) => {
    return (
        <li>
            <a href="#">{text}</a>
        </li>
    );
};
const NavView = () => {
    return (
        <nav>
            <ul>
                <MenuView text="메뉴1" />
                <MenuView text="메뉴2" />
            </ul>
        </nav>
    );
};