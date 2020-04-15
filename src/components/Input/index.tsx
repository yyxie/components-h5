import React from 'react';
import './style.less';

export interface InputProps {
    defaultValue?: string | number | undefined,
    initialValue?: string | number | undefined,
    value?: string | number | undefined,
    type?: string,
    min?: number,
    max?: number,
    maxLength?: number,
    placeholder?: string,
    pattern?: RegExp, // 用来限制用户输入
    onKeyPress?:  (event: React.KeyboardEvent) => void,
    onChange?: (value: string | number) => void;
}

export interface InputState {
    value: string | number | undefined,
    inputType: string
}

export default class Input extends React.Component<InputProps, InputState> {
    constructor(props: InputProps) {
        super(props);
        const {type} = props;
        const value = typeof props.value === 'undefined' ? props.defaultValue : props.value;
        let inputType = 'text';
        if (type === 'bankCard' || type === 'phone') {
            inputType = 'tel';
        } else if (type === 'password') {
            inputType = 'password';
        } else if (type === 'digit') {
            inputType = 'number';
        } else if (type === 'number') {
            inputType = 'number';
        } else {
            inputType = 'text';
        }
        this.state = {
            value: value || '',
            inputType
        }
    }

    componentWillReceiveProps(nextProps: InputProps){
        if(nextProps.value !== this.props.value){
            this.setState({
                value: nextProps.value
            })
        }
    }

    onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {type, pattern} = this.props;
        const {value} = this.state;
        const nextValue = e.target.value;
        let replaceVal = nextValue
        switch (type) {
            case 'bankCard':
                replaceVal = nextValue.replace(/\D/g, '').replace(/(....)(?=.)/g, '$1 ');
                break;
            case 'phone':
                replaceVal = nextValue.replace(/\D/g, '').substring(0, 11);
                const valueLen = replaceVal.length;
                if (valueLen > 3 && valueLen < 8) {
                    replaceVal = `${replaceVal.substr(0, 3)} ${replaceVal.substr(3)}`;
                } else if (valueLen >= 8) {
                    replaceVal = `${replaceVal.substr(0, 3)} ${replaceVal.substr(3, 4)} ${nextValue.substr(
                        7,
                    )}`;
                }
                break;
            case 'number':
                replaceVal = nextValue.replace(/\D/g, '');
                break;
            case 'text':
            case 'password':
            default:
                break;
        }
        if(pattern && nextValue.replace(pattern, '') !== ''){
            //@ts-ignore
            replaceVal = value
        }
        this.setState({
            value: replaceVal
        })
        this.props.onChange && this.props.onChange(replaceVal)

    }

    render() {
        const {value, inputType} = this.state;
        const {min, max, maxLength, placeholder, pattern, type} = this.props;

        return (
            <input
                className="input"
                type={inputType}
                min={min}
                max={max}
                maxLength={maxLength}
                placeholder={placeholder}
                value={value}
                onKeyPress={this.props.onKeyPress}
                onChange={this.onChange}
            />
        )
    }
}
