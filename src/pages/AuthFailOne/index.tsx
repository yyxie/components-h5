import React, {useState, useEffect} from 'react';
import {Button} from 'antd-mobile'
import failImg from '../../assets/icons/icon-fail.png'
import './style.less';

export default function () {
    return (
        <div className="result-container">
            <img src={failImg} className="result-icon" />
            <div className="result-title">认证失败！</div>
            <div className="result-text">证件与该人不一致或证件信息输入错误</div>
            <Button className="result-btn">再次认证</Button>
        </div>
    )
}
