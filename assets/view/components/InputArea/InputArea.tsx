import React from "react";
import './InputArea.scss'

interface InputAreaProps {
    id: string,
    header?: string,
    type?: 'email' | 'password' | 'submit' | 'text',
    submitFor?: string
    placeholder?: string
}

const InputArea = (props: InputAreaProps) => {
    if (props.type == 'submit' && props.submitFor)
        return (
            <div className="inputArea__wrapper">
                <input id={props.id} className="inputArea__input" type={props.type} />
            </div>
        )
    else 
        return (
            <div className="inputArea__wrapper">
                {
                    props.header &&
                    <div id={props.id} className="inputArea__header">
                        <p>{props.header}</p>
                    </div>
                }
                
                {
                    props.type && 
                    <input id={props.id} className="inputArea__input" 
                    type={props.type} placeholder={props.placeholder}/>
                }
                        
            </div>
        )
}

export default InputArea;