import React from 'react';
import '../style.less'

interface ItemProps {
    label?: string,

}

interface ItemState {

}

export default class Item extends React.Component<ItemProps, ItemState> {
    constructor(props: ItemProps) {
        super(props);
        this.state = {}
    }

    render() {
        const { label, children } = this.props;
        return (
            <div className="form-item">
                <span>{label}</span>
                <div className="form-content">{children}</div>
            </div>
        )
    }
}
