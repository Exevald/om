import React from "react";
import './InputArea.scss'

interface InputAreaProps {
    header: string,
    type?: 'email' | 'password',
    placeholder: string
}

const InputArea = (props: InputAreaProps) => {
    return (
        <div>
            <div className="inputArea__header">
                <p>{props.header}</p>
            </div>
            
            {
                props.type && 
                <input  className="inputArea__input" 
                type={props.type} placeholder={props.placeholder}/>
            }
                    
        </div>
    )
}

export default InputArea;