import React, { useEffect } from "react";
import './InputArea.scss'
import { MAX_LABEL_DEFAULT_SIZE, MAX_LABEL_GROUP_SIZE, MAX_LABEL_STUDENT_NAME_SIZE, MAX_LABEL_STUDENT_SURNAME_SIZE, MAX_LABEL_SUBJECT_SIZE, MIN_LABEL_DEFAULT_SIZE, MIN_LABEL_GROUP_SIZE, MIN_LABEL_STUDENT_NAME_SIZE, MIN_LABEL_STUDENT_SURNAME_SIZE, MIN_LABEL_SUBJECT_SIZE } from "../../../utility/utilities";

interface InputAreaProps {
    id: string,
    type: 'email' | 'password' | 'text' | 'group' | 'subject' | 'checkbox' | 'studentName' | 'studentSurname',
    header?: string,
    widthChangeable?: boolean,
    placeholder?: string,
    value?: string
}


function changeWidth(id: string, type: InputAreaProps['type'], isWiwidthChangeable: boolean) {
    const el = document.getElementById(id) as HTMLInputElement;
    if (isWiwidthChangeable) {

        let minSize, maxSize;
        switch(type) {
            case 'studentName':
                minSize = MIN_LABEL_STUDENT_NAME_SIZE;
                maxSize = MAX_LABEL_STUDENT_NAME_SIZE;
            case 'studentSurname':
                minSize = MIN_LABEL_STUDENT_SURNAME_SIZE;
                maxSize = MAX_LABEL_STUDENT_SURNAME_SIZE;
            case 'group':
                minSize = MIN_LABEL_GROUP_SIZE;
                maxSize = MAX_LABEL_GROUP_SIZE;
            case 'subject':
                minSize = MIN_LABEL_SUBJECT_SIZE;
                maxSize = MAX_LABEL_SUBJECT_SIZE;
            default:
                minSize = MIN_LABEL_DEFAULT_SIZE;
                maxSize = MAX_LABEL_DEFAULT_SIZE;
        }

        el.style.width = minSize + 'px'

        if (el.scrollWidth < minSize) {
            el.style.width = minSize + 2 + 'px'
        } else
        if (el.scrollWidth > maxSize) {
            el.style.width = maxSize + 2 + 'px'
        } else {
            el.style.width = el.scrollWidth + 2 + 'px'
        }

    }
}


const InputArea = (props: InputAreaProps) => {
    const styles = `inputArea__input inputArea__${props.type}`;
    
    useEffect(() => 
        changeWidth(props.id, props.type, props.widthChangeable), 
    []);
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
                onChange={() => changeWidth(props.id, props.type, props.widthChangeable)} 
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