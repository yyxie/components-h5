import React from 'react';
import {Toast} from 'antd-mobile'
import Gallery from '../Gallery';
import addIcon from './icon-camera.png';
import Tips from '../../utils/Tips'
import Popup from '../Popup';
import './style.less'

interface fileObj {
    file: File,
    src: string | ArrayBuffer | null,
    id: string
}

export interface ImageUploadProps {
    text: string,
    width?: string,
    height?: string,
    style?: any,
    addBg?: any,
    multiple?: boolean,
    acceptList?: string[],
    maxNum?: number,
    maxSize?: number,
    onAdd?: (file: fileObj) => void,
    onDel?: (id: string, imageList: any[]) => void,
}

interface ImageUploadState {
    imageList: any[],
    show: boolean
}

const MAX_WIDTH = 800;
export default class ImageUpload extends React.Component<ImageUploadProps, ImageUploadState> {
    constructor(props: ImageUploadProps) {
        super(props);
        this.state = {
            imageList: [],
            show: false
        }
    }

    static defaultProps = {
        width: '200px',
        height: '200px',
        acceptList: ['image/png', 'image/jpeg', 'image/jpg'],
        multiple: false,
        maxNum: 99,
        maxSize: 10
    };

    btof = (data: string, fileName: string) => {
        const dataArr = data.split(",");
        const byteString = atob(dataArr[1]);

        const u8Arr = new Uint8Array(byteString.length);
        for (let i = 0; i < byteString.length; i++) {
            u8Arr[i] = byteString.charCodeAt(i);
        }
        return new File([u8Arr], fileName + ".jpeg", {
            type: "image/jpeg",
            endings: "native"
        });
    }

    /**
     * base64压缩（图片-canvas互转）
     * @param {file} base64 base64图片数据
     * @param {number} quality 图片质量
     * @param {string} format 输出图片格式
     * @return {base64} data 图片处理完成后的base64
     */
    compress = (file: File): any => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = async (e) => {
                if (reader.result) {
                    if (file.size < Math.pow(1024, 2)) {
                        resolve(reader.result)
                    } else {
                        let cvs = document.createElement('canvas')
                        let img = document.createElement('img')

                        img.crossOrigin = 'anonymous';
                        //@ts-ignore
                        img.src = reader.result
                        // 图片偏移值
                        let offetX = 0
                        img.onload = () => {
                            console.log('img', img)
                            if (img.width > MAX_WIDTH) {
                                cvs.width = MAX_WIDTH;
                                cvs.height = img.height * MAX_WIDTH / img.width;
                                offetX = (img.width - MAX_WIDTH) / 2
                            } else {
                                cvs.width = img.width;
                                cvs.height = img.height;
                            }
                            //@ts-ignore
                            cvs.getContext('2d').drawImage(img, 0, 0, cvs.width, cvs.height)
                            let imageData = cvs.toDataURL('image/jpeg', 0.8);
                            resolve(imageData);
                        }
                    }
                }
            }
        })
    }
    /**
     * 选择图片
     */
    handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        Tips.addLoading('图片处理中...');
        this.handleCloseModal()
        const {maxSize, acceptList = []} = this.props;
        const files = e.target.files || [];
        const {imageList} = this.state;
        for (let i = 0, len = files.length; i < len; i++) {
            const file = files[i];
            console.log('fileSize', file.size);
            console.log('file', file);
            //const fileM = file.size / 1024 / 1024
            if (acceptList && acceptList.indexOf(file.type) >= 0) {
                const imageData = await this.compress(file);
                const newfile = this.btof(imageData, file.name);
                console.log('newFilesize', newfile.size)
                const fileObj = {
                    file: newfile,
                    src: imageData,
                    id: `${i}-file`
                };
                console.log('fileObj');
                console.log(fileObj)
                Tips.removeLoading();
                imageList.push(fileObj)
                this.setState({
                    imageList
                })

                this.props.onAdd && this.props.onAdd(fileObj)
            } else {
                Tips.removeLoading();
                Toast.info(`只能${acceptList.join(',')}图片`)
            }

        }
    }
    /**
     * 删除图片
     * @param {fileObj} fileObj
     */
    onDel = (fileObj: fileObj) => {
        const {imageList} = this.state;
        const leftList = imageList.filter((item) => {
            return item.id !== fileObj.id
        });
        this.setState({
            imageList: leftList
        })
        this.props.onDel && this.props.onDel(fileObj.id, imageList)
    }
    /**
     * 获取图片
     * @returns {any[]}
     */
    getAllImage = () => {
        return this.state.imageList;
    }

    /**
     * 关闭弹框
     */
    handleCloseModal = () => {
        console.log('fff')
        this.setState({
            show: false
        })
    }
    /**
     * 打开选择上传途径的弹框
     */
    handleChooseType = () => {
        this.setState({
            show: true
        })
    }

    render() {
        const {text = '点击上传图片', width, height, style, addBg, multiple, maxNum, acceptList = []} = this.props;
        const {imageList} = this.state;
        console.log('imageList', imageList)
        return (
            <div>
                <Gallery imageList={imageList} {...this.props} onDel={this.onDel} />
                {(!maxNum || imageList.length < maxNum)
                &&
                (<div
                        className="upload-wrap"
                        style={{width, height, ...style}}
                        //onClick={this.handleChooseType}
                    >
                        {addBg && <img alt="" className="upload-bg" style={{width, height}} src={addBg} />}
                        <div className="upload-btn">
                            <img alt="" className="upload-add" src={addIcon} />
                            <span>{text}</span>
                        </div>
                        <input
                            className="file-btn"
                            type="file"
                            name="pic1"
                            accept={acceptList.join(',')}
                            multiple={multiple}
                            onChange={this.handleChange}
                        />
                    </div>
                )
                }
                <Popup position="bottom" show={this.state.show}>
                    <div style={{width: '100%', background: '#F4F5F8'}}>
                        <div className="upload-type-wrap">
                            <div className="file-upload-select-item">
                                <input
                                    className="file-btn"
                                    type="file"
                                    name="pic1"
                                    accept={acceptList.join(',')}
                                    multiple={multiple}
                                    onChange={this.handleChange}
                                />
                                从手机相册选择
                            </div>

                            <div className="file-upload-select-item">
                                <input
                                    className="file-btn"
                                    type="file"
                                    name="pic2"
                                    accept={acceptList.join(',')}
                                    capture="camera"
                                    multiple={multiple}
                                    onChange={this.handleChange}
                                />
                                拍照
                            </div>
                        </div>
                        <div className="file-upload-select-item select-cancel"
                             onClick={this.handleCloseModal}>取消
                        </div>
                    </div>
                </Popup>
            </div>
        )
    }
}
