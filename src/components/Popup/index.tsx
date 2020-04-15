import React from 'react';
import PopupContainer from './PopupContainer'
import './style.less'

interface PopupProps {
    show: boolean,
    maskCloseable?: boolean,
    position?: 'center' | 'top' | 'bottom' | 'left' | 'right',
    onClose?: ()=>void,
    children: any
}

export default class Popup extends React.Component<PopupProps> {
    constructor(props: PopupProps) {
        super(props);
    }

    componentDidMount() {

    }
    static defaultProps = {
        maskCloseable: true,
        position: 'center'
    }

    onClose = ()=>{
       const {maskCloseable} = this.props;
       if(maskCloseable){
           this.props.onClose && this.props.onClose();
       }
    }

    render() {
        const {position, show} = this.props;
        if(show){
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return (
           <PopupContainer show={this.props.show}>
               {show ? <div id="popupContainer" className={`popup-pos-${position}`} onClick={this.onClose}>
                   {React.cloneElement(this.props.children, {className: 'popup-content', ...this.props.children.props})}
               </div> : null }
            </PopupContainer>
        )
    }
}
