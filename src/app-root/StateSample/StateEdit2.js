import React, { useState } from 'react';

const StateEdit2 = () => {
    /**
     * 배열 형태로 값 정의
     * 첫번째 배열값 : 변수
     * 두번째 배열값 : 값을 변경하는 함수
     */
    const [number, setNumber] = useState(0);

    const onIncrease = () => {
        setNumber(number + 1);
    };

    const onDecrease = () => {
        setNumber(number - 1);
    };

    return (
        <div>
            <h1>{number}</h1>
            <button onClick={onIncrease}>+1</button>
            <button onClick={onDecrease}>-1</button>
        </div>
    );

}



export default StateEdit2;