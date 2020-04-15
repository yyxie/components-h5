import React, {useState, useEffect, useRef} from 'react';
import {Button} from 'antd-mobile'
import {
    useParams
} from "react-router-dom";
import successImg from '../../assets/icons/icon-success.png'
import './style.less';

const useCurrentValue = (val: number) => {
    const ref = useRef(val);
    useEffect(() => {
        ref.current = val;
    }, [val]);
    return ref;
};

export default function (props: any) {
    const [time, setTimeFu] = useState(5);
    let { text } = useParams();
    // const text = props.location.state.text;
    const timeRef3 = useCurrentValue(time);
    useEffect(() => {
        const timerHandle = setInterval(() => {
            if (timeRef3.current - 1 >= 0) {
                setTimeFu(time => time - 1);
            } else {
                clearInterval(timerHandle);
            }
        }, 1000);
    }, []);

    return (
        <div className="result-container">
            <img src={successImg} className="result-icon" />
            <div className="result-title">{text}</div>
            <Button className="result-btn">{`返回首页(${time}s)`}</Button>
        </div>
    );
}
