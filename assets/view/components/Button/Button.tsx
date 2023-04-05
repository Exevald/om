import React from "react";
import './Button.scss';


interface ButtonProps {
    id?: string,
    type?: 'login' | 'register' | 'submit' | 'filled' | 'transparent' | 'filledNoColor' | 'transparentNoColor';
    submitFor?: string;
    data: string;
}

const Button = (props: ButtonProps) => {
    const buttonType = props.type;
    let buttonStyle = `buttons__default buttons__${buttonType}`;

    switch (buttonType) {
        case 'register':
            buttonStyle += ` buttons__transparentNoColor`
            return (
                <a href='auth'>
                    <button className={buttonStyle}>
                        {props.data}
                    </button>
                </a>
            )
        case 'login':
            buttonStyle += ` buttons__filledNoColor`
            return (
                <a href='auth'>
                    <button className={buttonStyle}>
                        {props.data}
                    </button>
                </a>
            )
        case 'submit':
            const submit = 'buttons_default buttons__submit-' + props.submitFor;
            return (
                <button id={props.id} type='submit' className={submit}>
                    {props.data}
                </button>
            )
        default:
            return (
                <button id={props.id} className={buttonStyle}>
                    {props.data}
                </button>
            )
    }
    
}

export default Button;