import React from 'react';
import {List, Picker, InputItem} from 'antd-mobile';
import {Form, Input, ImageUpload, Select} from '../../../components';
import cardFront from '../../../assets/images/resident-book-index.png';
import cardBackground from '../../../assets/images/resident-book-person.png';
import personFace from '../../../assets/images/person-face.png';
import './style.less';

interface ResidentBookCardProps {
    onAdd?: (file: any) => void,
    onDel?: (id: string, imageList?: any[]) => void,
}

interface IdCardState {
    count: number
}

export default class ResidentBookCard extends React.Component<ResidentBookCardProps, IdCardState> {
    constructor(props: ResidentBookCardProps) {
        super(props);
        this.state = {
            count: 0
        }
    }

    personFaceRef: any
    cardHomeRef: any
    cardPersonRef: any

    getAllImage = (value: string[]) => {
        return {
            auth_photo: this.personFaceRef.getAllImage(),
            id_photo: [...this.cardHomeRef.getAllImage(), ...this.cardPersonRef.getAllImage()],
        }
    }
    // 图片添加
    onAdd = (fileObj: any) => {
        this.setState((prevState) => {
            return {count: prevState.count + 1}
        })
        this.props.onAdd && this.props.onAdd(fileObj)
    }
    // 图片删除
    onDel = (id: string, imageList: any[]) => {
        this.setState((prevState) => {
            return {count: prevState.count - 1}
        })
        this.props.onDel && this.props.onDel(id)
    }

    render() {
        return (
            <div className="card-content">
                <ImageUpload
                    width={'240px'}
                    height={'160px'}
                    text={"点击上传户口簿首页照"}
                    addBg={cardFront}
                    maxNum={1}
                    ref={(imgRef) => this.cardHomeRef = imgRef}
                    onAdd={this.onAdd}
                    onDel={this.onDel}
                />
                <ImageUpload
                    width={'240px'}
                    height={'160px'}
                    text={"点击上传户口簿本人页"}
                    style={{marginTop: '24px'}}
                    addBg={cardBackground}
                    maxNum={1}
                    ref={(imgRef) => this.cardPersonRef = imgRef}
                    onAdd={this.onAdd}
                    onDel={this.onDel}
                />
                <ImageUpload
                    width={'240px'}
                    height={'160px'}
                    text={"点击上传人脸正面照"}
                    style={{marginTop: '24px'}}
                    addBg={personFace}
                    maxNum={1}
                    ref={(imgRef) => this.personFaceRef = imgRef}
                    onAdd={this.onAdd}
                    onDel={this.onDel}
                />
            </div>
        );
    }

}

