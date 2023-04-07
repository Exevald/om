import React from "react";
import './Button.scss';


interface ButtonProps {
    id?: string,
    type?: 'login' | 'register' | 'submit' | 'filled' | 'transparent' | 'filledNoColor' | 'transparentNoColor';
    onClick?: React.Dispatch<React.SetStateAction<boolean>>,
    data: string;
}

const Button = (props: ButtonProps) => {
    const buttonType = props.type;
    let buttonStyle = `buttons__default buttons__${buttonType}`;

    switch (buttonType) {
        case 'register':
            buttonStyle += ` buttons__transparentNoColor`;
            return (
                <a href='auth'>
                    <button className={buttonStyle}>
                        {props.data}
                    </button>
                </a>
            )
        case 'login':
            buttonStyle += ` buttons__filledNoColor`;
            return (
                <a href='auth'>
                    <button className={buttonStyle}>
                        {props.data}
                    </button>
                </a>
            )
        case 'submit':
            buttonStyle += ' buttons__filled';
            return (
                <button id={props.id} className={buttonStyle}>
                    {props.data}
                </button>
            )
        default:
            return (
                <button id={props.id} className={buttonStyle} onClick={() => props.onClick}>
                    {props.data}
                </button>
            )
    }
    
}

export default Button;