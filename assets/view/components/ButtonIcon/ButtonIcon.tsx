import React from "react";

import './ButtonIcon.scss';

interface ButtonIconProps {
    id?: string,
    type: 'close' | 'add' | 'more' | 'minus' | 'checkbox' | 'checkboxOutline'
}
const ButtonIcon = (props: ButtonIconProps) => {
    const src = `./images/Icons/${props.type}.svg`;
    return (
        <img className="buttonIcon__default"
             src={src}
             alt={props.type}
        />
    )
}

export default ButtonIcon;