import React, { useEffect } from "react";
import './InputArea.scss'
import { MIN_LABEL_GROUP_SIZE } from "../../../utility/utilities";

interface InputAreaProps {
    id: string,
    header?: string,
    type: 'email' | 'password' | 'text' | 'group' | 'subject' | 'checkbox',
    placeholder?: string,
    value?: string
}
function changeWidth(id: string, type: InputAreaProps['type']) {
    if (type === 'group' || type === 'subject') {
        const el = document.getElementById(id) as HTMLInputElement;
        if (el.value.length < MIN_LABEL_GROUP_SIZE) {
            el.style.width =  MIN_LABEL_GROUP_SIZE + 'ch';
        } else {
            el.style.width = el.value.length + 'ch';
        }
    }
}

const InputArea = (props: InputAreaProps) => {
    const styles = `inputArea__input inputArea__${props.type}`;


    useEffect(() => changeWidth(props.id, props.type))
    return (
        <div>
            {
                props.header &&
                <div className="inputArea__header">
                    <p>{props.header}</p>
                </div>
            }
            
            {
                props.type && 
                <input id={props.id} className={styles} defaultValue={props.value} type={props.type} 
                onChange={() => changeWidth(props.id, props.type)} 
                placeholder={props.placeholder} />
            }
                    
        </div>
    )
}

export default InputArea;