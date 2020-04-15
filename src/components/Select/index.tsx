import React from 'react';
import {Picker, Icon} from 'antd-mobile'

interface pickerProps {
    value?: string[],
    initialValue?: string[],
    data: any[],
    title?: string,
    onChange?: (value: string[]) => void,

}

interface pickerStates {
    value: string[]
}

export default class Select extends React.Component<pickerProps, pickerStates> {
    constructor(props: pickerProps) {
        super(props);
        this.state = {
            value: []
        }
    }

    componentDidMount() {
        const {value, initialValue} = this.props;
        this.setState({
            value: value ? value : (initialValue ? initialValue : [])
        })
    }

    componentWillReceiveProps(nextProps: pickerProps) {
    }

    onConfirm = (value: any) => {
        console.log('value', value)
        this.setState({
            value
        })
        this.props.onChange && this.props.onChange(value)
    }
    onCancel = () => {

    }

    render() {
        const {data, title} = this.props;
        const {value} = this.state;
        const current = data.filter((item) => {
            return item.value === value[0]
        })
        console.log('current', current);
        return (
            <Picker
                extra="请选择(可选)"
                data={data}
                title={title}
                onOk={this.onConfirm}
                onChange={this.onConfirm}
                onDismiss={this.onCancel}
                cols={1}
                value={value}

            >
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <span style={{flex: 1}}>{current.length >= 1 ? current[0]['label'] : ''}</span>
                    <Icon type="right" size={'xs'} />
                </div>
            </Picker>
        )
    }
}
