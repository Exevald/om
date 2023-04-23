import React, { useEffect } from "react";
import './InputArea.scss'
import { MIN_LABEL_GROUP_SIZE } from "../../../utility/utilities";

interface InputAreaProps {
    id: string,
    type: 'email' | 'password' | 'text' | 'group' | 'subject' | 'checkbox' | 'studentName' | 'studentSurname',
    header?: string,
    widthChangeable?: boolean,
    placeholder?: string,
    value?: string
}
function changeWidth(id: string) {
    const el = document.getElementById(id) as HTMLInputElement;
    if (el.value.length < MIN_LABEL_GROUP_SIZE) {
        el.style.width =  MIN_LABEL_GROUP_SIZE + 'ch';
    } else {
        el.style.width = el.value.length + 'ch';
    }
}

const InputArea = (props: InputAreaProps) => {
    const styles = `inputArea__input inputArea__${props.type}`;

    if (props.widthChangeable) {
        useEffect(() => changeWidth(props.id))
    }
    return (
        <div>
            {
                props.header &&
                <div className="inputArea__header">
                    <p>{props.header}</p>
                </div>
            }
            {
                props.widthChangeable && 
                <input id={props.id} className={styles} defaultValue={props.value} type={props.type} 
                onChange={() => changeWidth(props.id)} 
                placeholder={props.placeholder} />
            }
            {
                !props.widthChangeable && 
                <input id={props.id} className={styles} defaultValue={props.value} type={props.type} 
                placeholder={props.placeholder} />
            }       
        </div>
    )
}

export default InputArea;