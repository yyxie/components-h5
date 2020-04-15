import React, {useState} from 'react';
import {Icon} from 'antd-mobile';
import Popup from '../Popup';
import './style.less';


interface fileObj {
    src: string,
    id: string
}

interface ImageItemProps {
    imageList: fileObj[],
    show: boolean,
    onClose: () => void
}


export default function (props: ImageItemProps) {
    const {imageList, show, onClose} = props;
    const imageLen = imageList.length;
    const [current, setCurrent] = useState(0);
    const currentImage = imageList[current]
    const handlePre = function () {
        if (current > 0) {
            setCurrent(current - 1)
        }
    }
    const handleNext = function () {
        if (current < imageLen) {
            setCurrent(current + 1)
        }
    }
    return (
        <Popup show={show} onClose={onClose}>
            <div className="preview-wrap">
                {current > 0 && <Icon type="left" size="lg" onClick={handlePre} />}
                <div className="image-current-wrap">
                    {currentImage && <img alt="" className="image-current" src={currentImage.src} />}
                </div>
                { current < imageLen -1 && <Icon type="right" size="lg" onClick={handleNext} />}
            </div>
        </Popup>
    )
}
