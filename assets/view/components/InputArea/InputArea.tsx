import React from "react";
import './InputArea.scss'

interface InputAreaProps {
    id: string,
    header?: string,
    type?: 'email' | 'password' | 'text' | 'group' | 'subject',
    placeholder?: string,
    value?: string
}

const InputArea = (props: InputAreaProps) => {
    const styles = `inputArea__input inputArea__${props.type}`
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
                <input id={props.id} className={styles} defaultValue={props.value}
                type={props.type} placeholder={props.placeholder}  />
            }
            
            {
                !props.type && 
                <input id={props.id} className={styles} defaultValue={props.value}
                type="text" placeholder={props.placeholder}/>
            }
                    
        </div>
    )
}

export default InputArea;