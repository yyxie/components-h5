import React from 'react';
import Item from './Item';
import PreviewImage from '../PreviewImage';
import './style.less'

export interface GalleryProps {
    width?: string,
    height?: string,
    style?: any,
    imageList?: any,
    readonly?: boolean
    onDel?: any
}

interface GalleryState {
    show: boolean,
}

export default class Gallery extends React.Component<GalleryProps, GalleryState> {
    constructor(props: GalleryProps) {
        super(props);
        this.state = {
            show: false
        }
    }

    handlePreView = () => {
        this.setState({
            show: true
        })
    }
    closePreview = () =>{
        this.setState({
            show: false
        })
    }


    render() {
        const {imageList} = this.props
        const {show} = this.state;
        return (
            <div className="gallery-container">
                {
                    imageList.map((imageObj: any) => {
                        return <Item key={imageObj.id} fileObj={imageObj} {...this.props}
                                     onClick={this.handlePreView} />
                    })
                }
                <PreviewImage imageList={imageList} show={show} onClose={this.closePreview}/>
            </div>
        )
    }
}
