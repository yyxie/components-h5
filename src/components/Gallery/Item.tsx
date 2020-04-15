import React from 'react';
import {Icon} from 'antd-mobile';
import addIcon from './icon-camera.png';
import './style.less';


interface fileObj {
    file: File,
    src: string,
    id: string
}

interface ImageItemProps {
    width?: string,
    height?: string,
    style?: any,
    fileObj: fileObj,
    key?: string,
    readonly?: boolean,
    onDel?: any,
    onClick?: () => void

}

export default function (props: ImageItemProps) {
    const {
        readonly, width, height, style, fileObj, onDel = () => {
        }, onClick
    } = props;
    return (
        <div className="gallery-item-wrap" style={{width, height, ...style}} onClick={onClick}>
            <img alt="" className="gallery-item-bg"  src={fileObj.src} />
            {!readonly && (
                <Icon
                    type="cross-circle-o"
                    size={'sm'}
                    className="del-btn"
                    onClick={(e) => {
                        e.stopPropagation();
                        onDel(fileObj)
                    }} />)}
        </div>
    )
}
