import React from "react";
import './Button.scss';


interface ButtonProps {
    id?: string,
    type: 'login' | 'register' | 'submit';
    submitFor?: string;
    data: string;
}

const Button = (props: ButtonProps) => {
    const buttonType = props.type;
    const buttonStyle = `buttons__default buttons__${buttonType}`;

    switch (buttonType) {
        case 'register':
            // что и в login 
            // TODO: поменять на норальный case
        case 'login':
            return (
                <a href='auth'>
                    <div className={buttonStyle}>
                        {props.data}
                    </div>
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
            <div className={buttonStyle}>
                <p>{props.data}</p>
            </div>
    }
    
}

export default Button;