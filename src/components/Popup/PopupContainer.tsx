import React from 'react';
import ReactDOM from 'react-dom';
import './style.less';

// These two containers are siblings in the DOM
const appRoot = document.getElementById('root');

interface ModalContainerProps {
    show: boolean
}

export default class PopupContainer extends React.Component<ModalContainerProps> {
    constructor(props: ModalContainerProps) {
        super(props);
        this.el = document.createElement('div');

    }

    el: any;

    componentDidMount() {
        // The portal element is inserted in the DOM tree after
        // the Modal's children are mounted, meaning that children
        // will be mounted on a detached DOM node. If a child
        // component requires to be attached to the DOM tree
        // immediately when mounted, for example to measure a
        // DOM node, or uses 'autoFocus' in a descendant, add
        // state to Modal and only render the children when Modal
        // is inserted in the DOM tree.
        appRoot && appRoot.appendChild(this.el);

    }

    componentWillUnmount() {
        appRoot && appRoot.removeChild(this.el);
    }

    /*componentWillReceiveProps(nextProps: ModalContainerProps){
        if(this.props.show){
            appRoot && appRoot.appendChild(this.el);
        } else {
            appRoot && appRoot.removeChild(this.el);
        }
    }*/
    render() {
        return ReactDOM.createPortal(
            this.props.children,
            this.el,
        );
    }
}
