import React, {useState, useEffect} from 'react';
import {Button} from 'antd-mobile'
import failImg from '../../assets/icons/icon-fail.png'
import './style.less';

export default function () {
    return (
        <div className="result-container">
            <img src={failImg} className="result-icon" />
            <div className="result-title">认证失败！</div>
            <div className="result-text">失败次数过多，建议尝试其他认证通道</div>
            <Button className="result-btn">人工认证</Button>
        </div>
    )
}
