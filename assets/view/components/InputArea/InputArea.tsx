import React from "react";


interface InputAreaProps {
    header: string,
    placeholder: string
}

const InputArea = (props: InputAreaProps) => {
    return (
        <div>
            <p>{props.header}</p>
            <input placeholder={props.placeholder}>
            </input>
        </div>
    )
}

export default InputArea;