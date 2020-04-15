import React from 'react';
import Item from './Item';

import './style.less'

export interface FormProps {
    children?: React.ReactNode;
    className?: string
}

const Form = function(props: FormProps){
        return (
            <form className={`form-wrap ${props.className}`}>
                {props.children}
            </form>
        )
    }
Form.Item = Item;

export default Form;
