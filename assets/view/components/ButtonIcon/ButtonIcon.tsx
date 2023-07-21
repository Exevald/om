import React from "react";
// @ts-ignore
import add from './Icons/add.svg'; import checkbox from './Icons/checkbox.svg'; import close from './Icons/close.svg'; 
// @ts-ignore
import minus from './Icons/minus.svg'; import more from './Icons/more.svg'; import checkboxOutline from './Icons/checkboxOutline.svg';
// @ts-ignore
import minusTransparent from './Icons/minusTransparent.svg'

import './ButtonIcon.scss';

interface ButtonIconProps {
    id?: string,
    type: 'close' | 'add' | 'more' | 'minus' | 'checkbox' | 'checkboxOutline' | 'minusTransparent'
}
const ButtonIcon = (props: ButtonIconProps) => {
    let src = '';
    switch(props.type) {
        case "close":
            src = close;
            break;
        case "add":
            src = add;
            break;
        case "more":
            src = more;
            break;
        case "minus":
            src = minus;
            break;
        case "minusTransparent":
            src = minusTransparent;
            break
        case "checkbox":
            src = checkbox;
            break;
        case "checkboxOutline":
            src = checkboxOutline;
    }
    return (
        <img className="buttonIcon__default"
             src={src}
             alt={props.type}
        />
    )
}

export default ButtonIcon;