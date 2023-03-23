import React from "react";
import './Button.scss';


interface ButtonProps {
    type: 'login' | 'register';
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
                        <h4>{props.data}</h4>
                    </div>
                </a>
            )
            break;
        default:
            <div className={buttonStyle}>
                <h4>{props.data}</h4>
            </div>
    }
    
}

export default Button;