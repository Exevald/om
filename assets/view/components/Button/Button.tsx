import React from "react";
import './Button.scss';


interface ButtonProps {
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
                        <p>{props.data}</p>
                    </div>
                </a>
            )
            break;

        case 'submit':
            if (props.submitFor) {
                const submit = 'buttons__submit-' + props.submitFor;
                return (
                    <button form={submit} type='submit' className={submit}>
                        {props.data}
                    </button>
                )
            } else return <>Error</>
            break;

        default:
            <div className={buttonStyle}>
                <p>{props.data}</p>
            </div>
    }
    
}

export default Button;