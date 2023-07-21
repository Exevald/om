import React from "react";
import './Button.scss';
import ButtonIcon from "../ButtonIcon/ButtonIcon";

interface ButtonProps {
    id?: string,
    type:   'login' | 'register' | 'submit' | 
            'filled' | 'transparent' |
            'filledNoColor' | 'transparentNoColor' |
            'transparentDisabled',
    iconType?: 'add' | 'minus' | 'more' | 'minusTransparent',
    onClick?: () => void,
    data: string;
}

const Button = (props: ButtonProps) => {
    let buttonType = props.type;
    let buttonStyle = `buttons__default buttons__${buttonType}`;

    switch (buttonType) {
        case 'register':
            buttonStyle += ` buttons__transparentNoColor`;
            return (
                <a onClick={props.onClick}>
                    <button className={buttonStyle}>
                        {props.data}
                    </button>
                </a>
            )
        case 'login':
            buttonStyle += ` buttons__filledNoColor`;
            return (
                <a onClick={props.onClick}>
                    <button className={buttonStyle}>
                        {props.data}
                    </button>
                </a>
            )
        case 'submit':
            buttonStyle += ' buttons__filled';
            return (
                <button id={props.id} className={buttonStyle} onClick={props.onClick}>
                    {props.data}
                </button>
            )
        default:
            props.iconType ? buttonStyle += ' buttons__hasIcon' : null;
            return (
                <button id={props.id} className={buttonStyle} onClick={props.onClick}>
                    {
                        props.iconType &&
                        <ButtonIcon type={props.iconType}/>
                    }
                    {props.data}
                </button>
            )
    }
}

export default Button;