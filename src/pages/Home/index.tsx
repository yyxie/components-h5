import React from 'react';
import {Button, Toast} from 'antd-mobile';
import {createForm} from 'rc-form';
import {createHashHistory} from 'history'
import {Form, Input, Select} from '../../components';
import Dict from '../../utils/dict';
import IdCard from './module/IdCard';
import BackHomeCard from './module/BackHomeCard';
import OfficerCard from './module/OfficerCard';
import PassPort from './module/PassPort';
import ResidentBookCard from './module/ResidentBookCard';
import TaiBaoCard from './module/TaiBaoCard';
import Util from '../../utils/util';

import iconSecurity from '../../assets/icons/icon-security.png';
import './style.less';

const history = createHashHistory();

interface RcFormPropsIF {
    getFieldProps: Function
    getFieldValue: Function
    getFieldError: Function
    validateFields: Function,
    setFieldsValue: Function,
    getFieldDecorator: Function
}

interface HomeProps {
    form: RcFormPropsIF,
    history: any
}

interface HomeState {
    imageCount: number,
    idType: string,
    disabledBtn: boolean
}


const idCardType = [
    {
        label: '身份证',
        value: Dict.CardType.IdCard,
    },
    {
        label: '护照',
        value: Dict.CardType.PassPort,
    },
    {
        label: '回乡证',
        value: Dict.CardType.BackHomeCard,
    },
    {
        label: '台胞证',
        value: Dict.CardType.TaiBaoCard,
    },
    {
        label: '军官证',
        value: Dict.CardType.OfficerCard,
    },
    {
        label: '户口簿',
        value: Dict.CardType.ResidentBookCard,
    },
];


class Home extends React.Component<HomeProps, HomeState> {
    constructor(props: HomeProps) {
        super(props);
        this.state = {
            idType: Dict.CardType.IdCard,
            disabledBtn: true,
            imageCount: 0
        }
    }

    imgRef: any;


    idCardTypeChange = (value: string[]) => {
        this.setState({
            idType: value[0],
            imageCount: 0
        })
        this.props.form.setFieldsValue({'name': '', id_no: ''});
    }

    onSubmit = () => {
        this.props.form.validateFields(async (error: Object, values: Object) => {
            if (!error) {
                console.log('values', values);
                const imageObj = this.dealImage();
                if (JSON.stringify(imageObj) === '{}') {
                    Toast.info('请上传相关证件照片和人脸照片')
                    return false;
                } else {
                    const params = {
                        ...values,
                        id_type: this.state.idType,
                        ...imageObj
                    }
                    console.log('params', params)

                    var ifIos = navigator.userAgent.match(/iPhone|iPad|iPd/i) ? true : false;
                    if(ifIos){ // ios
                        //@ts-ignore
                        window.webkit.messageHandlers.currentCookies.postMessage(params);
                    } else { // 安卓
                        //@ts-ignore
                        window.androidInterface.submitAuth(JSON.stringify(params));

                    }
                }
            } else {
                Util.showFormErrorMessage(error);
            }
        })
    }
    /**
     * 处理图片
     * @returns {any}
     */
    dealImage = () => {
        const {id_photo, auth_photo} = this.imgRef ? this.imgRef.getAllImage() : {id_photo: [], auth_photo: []};
        const onlyOneIdPhoto = [Dict.CardType.OfficerCard, Dict.CardType.PassPort];
        // 本需要一张证件照片的但没有上传
        const noOneIdPhoto = onlyOneIdPhoto.indexOf(this.state.idType) >= 0 && id_photo.length != 1;
        // 本需要两张证件照片的但没有上传
        const noTwoIdPhoto = onlyOneIdPhoto.indexOf(this.state.idType) < 0 && id_photo.length != 2;
        if (noOneIdPhoto || noTwoIdPhoto || auth_photo.length === 0) {
            return {}
        } else {
            const imageResult = {
                id_photo: [],
                auth_photo: ''
            }
            imageResult.id_photo = id_photo.map((item: any) => {
                return item.src;
            })
            imageResult.auth_photo = auth_photo.map((item: any) => {
                return item.src;
            })[0]
            return imageResult;
        }

    }

    onAdd = () => {
        this.setState((prevState) => {
            return {imageCount: prevState.imageCount + 1}
        })

    }
    onDel = () => {
        this.setState((prevState) => {
            return {imageCount: prevState.imageCount - 1}
        })

    }

    /**
     * 获取图片组件
     * @returns {any}
     */
    getImageComponent = () => {
        const {idType} = this.state;
        let Component = <IdCard ref={(imgRef) => this.imgRef = imgRef} onAdd={this.onAdd} onDel={this.onDel} />
        if (idType === Dict.CardType.ResidentBookCard) {
            Component =
                <ResidentBookCard ref={(imgRef) => this.imgRef = imgRef} onAdd={this.onAdd} onDel={this.onDel} />
        }
        if (idType === Dict.CardType.BackHomeCard) {
            Component = <BackHomeCard ref={(imgRef) => this.imgRef = imgRef} onAdd={this.onAdd} onDel={this.onDel} />
        }
        if (idType === Dict.CardType.OfficerCard) {
            Component = <OfficerCard ref={(imgRef) => this.imgRef = imgRef} onAdd={this.onAdd} onDel={this.onDel} />
        }
        if (idType === Dict.CardType.TaiBaoCard) {
            Component = <TaiBaoCard ref={(imgRef) => this.imgRef = imgRef} onAdd={this.onAdd} onDel={this.onDel} />
        }
        if (idType === Dict.CardType.PassPort) {
            Component = <PassPort ref={(imgRef) => this.imgRef = imgRef} onAdd={this.onAdd} onDel={this.onDel} />
        }
        return Component;
    }

    disabledBtn = () => {
        const {idType, imageCount} = this.state;
        const {getFieldValue} = this.props.form;
        const onlyOneIdPhoto = [Dict.CardType.OfficerCard, Dict.CardType.PassPort]; //只要两张图
        // 需要两张图但是没有上传两张图
        const noOneIdPhoto = onlyOneIdPhoto.indexOf(this.state.idType) >= 0 && imageCount !== 2;
        // 需要三张图但是没有上传三张图
        const noTwoIdPhoto = onlyOneIdPhoto.indexOf(this.state.idType) < 0 && imageCount !== 3;
        const name = getFieldValue('name');
        const id_no = getFieldValue('id_no');
        return !idType || !name || !id_no || noOneIdPhoto || noTwoIdPhoto;
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const {idType} = this.state;
        return (
            <div className="home-wrap">
                <Form>
                    <Form.Item label="证件类型">
                        {getFieldDecorator('id_type', {
                            initialValue: [idType],
                            validateFirst: true,
                            rules: [{
                                required: true,
                                message: '请选择证件类型',
                            }],
                        })(<Select data={idCardType} onChange={this.idCardTypeChange} />)}
                    </Form.Item>
                    <Form.Item label="真实姓名">
                        {getFieldDecorator('name', {
                            rules: [{
                                required: true,
                                message: '请输入真实姓名',
                            }, {
                                pattern: /^[a-zA-Z·\u4e00-\u9FA5\s]+$/i,
                                message: '真实姓名仅支持输入英文字母、汉字、空格和标点符号"·"',
                            }],
                        })(
                            <Input
                                maxLength={20}
                                placeholder={'请输入'}
                                pattern={/^[a-zA-Z·\u4e00-\u9FA5\s]+$/i} />
                        )}
                    </Form.Item>
                    <Form.Item label="证件号码">
                        {getFieldDecorator('id_no', {
                            rules: [{
                                required: true,
                                message: '请输入证件号码',
                            }, {
                                pattern: /[a-zA-Z\d\s]+$/i,
                                message: '证件号码仅支持输入英文字母、阿拉伯数字',
                            }],
                        })(
                            <Input
                                maxLength={20}
                                placeholder={'请输入'}
                                pattern={/[a-zA-Z\d\s]+$/i}
                            />
                        )}
                    </Form.Item>
                </Form>
                <div className="division-title">
                    请使用手机横向拍摄
                </div>
                <Form className="image-content">
                    {this.getImageComponent()}
                    <div className="security-tips">
                        <img className="security-icon" src={iconSecurity} />
                        <span>我们承诺保障您的信息安全，证件仅用于身份验证</span>
                    </div>
                    <Button type="primary" disabled={this.disabledBtn()} onClick={this.onSubmit}>提交</Button>
                </Form>

            </div>
        );
    }
}

export default createForm()(Home);
