/**
 * react-motion 的测试
 * 简单的demo TransitionMotion
 */
import React, {Component} from 'react'
import {Motion, spring} from 'react-motion'
import Popup from '../Popup';

interface ModalProps {
    show: boolean,
    onClose: () => void
}

export default class Modal extends Component<ModalProps> {
    state = {
        show: true
    }

    componentDidMount() {
        this.setState({
            show: false
        })
    }

    render() {
        return (
            <Popup show={this.props.show} position={'center'}>
            </Popup>
        )
    }

}
