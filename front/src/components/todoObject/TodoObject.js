import React, { useState } from 'react'
import './TodoObject.css'
import { ReactComponent as CheckIcon } from '../../icons/check.svg'
import { ReactComponent as EditIcon } from '../../icons/edit.svg'
import { ReactComponent as TrashIcon } from '../../icons/trash.svg'

/**
 * todo 데이터 하나하나를 출력 해 주는 컴포넌트
 */
function TodoObject({ data }) {

    // 토글이 되어있는지 상태를 나타내는 hooks
    var [isOnToggle, setToggleState] = useState(false);

    var date = data.date;

    // 클릭시 전체 데이터를 출력 해 주기 위한 hook
    var [heightSize, setHeightSize] = useState("80px")

    var contents;
    // 데이터가 길면 말줄임표를 이용해 짧게 출력
    if (data.contents.length > 17) {
        contents = getSlicedContents(data.contents);
    } else {
        contents = data.contents;
    }

    // toggle 상태에 따라 데이터를 바꿔주기 위한 hook
    var [contents, setContents] = useState(contents);

    // toggle 상태와 컨텐츠 길이에 따라 클릭시 컨텐트 전체를 보여주는 함수
    const changeHeight = () => {
        // 글이 길 경우
        if (data.contents.length > 16) {
            // 토글이 안되어 있으면 크기를 늘림
            if (!isOnToggle) {
                setHeightSize("auto");
                setContents(data.contents);
                setToggleState(true);
            } else {
                setHeightSize("80px");
                var tmp = getSlicedContents(data.contents);
                setContents(tmp);
                setToggleState(false);
            }
        }
    }

    // 완료시의 컴포넌트
    var complete = (
        <div onClick={() => changeHeight()} className='object-box' style={{ height: heightSize }}>
            <CompleteContents date={date} contents={contents} />
            <CompleteButtonSet />
        </div>
    )

    // 진행중인 컴포넌트
    var ongoing = (
        <div onClick={() => changeHeight()} className='object-box' style={{ height: heightSize }}>
            <OngoingContents date={date} contents={contents} />
            <OngoingButtonSet />
        </div>
    )

    // 진행 상태에 따라 반환
    if (data.state === "complete") {
        return complete;
    } else {
        return ongoing;
    }

}


/**
 * 진행중인 객체
 */
function CompleteContents({ date, contents }) {

    return (
        <div className='object-contents'>
            <p className='contents-date complete'>{date}</p>
            <p className='contents-detail complete'>{contents}</p>
        </div>
    );

}

/**
 * 진행중인 객체 에 대한 버튼
 */
function CompleteButtonSet() {

    return (
        <div className='object-buttons'>
            <a href='#'><TrashIcon fill='#b2b2b2' width='17px' height='17px' /></a>
        </div>
    );

}

/**
 * 완료된 객체
 */
function OngoingContents({ date, contents }) {

    // var contents = makeShortString(data.contents)
    // var contents = data.contents;

    return (
        <div className='object-contents'>
            <p className='contents-date ongoing'>{date}</p>
            <p className='contents-detail ongoing'>{contents}</p>
        </div>
    );

}

/**
 * 완료된 객채에 대한 버튼들
 */
function OngoingButtonSet() {

    return (
        <div className='object-buttons'>
            <a href='#'><CheckIcon fill='#414141' width='23px' height='23px' /></a>
            <a href='#'><EditIcon fill='#414141' width='23px' height='23px' /></a>
            <a href='#'><TrashIcon fill='#414141' width='17px' height='17px' /></a>
        </div>
    );

}

/**
 * 받아온 문자열을 짧게 만들어주는 함수
 */
function getSlicedContents(contents) {
    var _contents = contents.substr(0, 13) + "...";
    return _contents;
}

export default TodoObject;