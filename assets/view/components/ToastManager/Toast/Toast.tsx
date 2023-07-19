import React, {useEffect} from "react";

import './Toast.scss';

// @ts-ignore
import close from "./close.svg"
import ToastManager from "../ToastManager";

interface ToastProps {
    notification: string
}
const Toast = (props: ToastProps) => {
    useEffect(() => {
        const toast = document.getElementById('toast')
        toast.classList.add('toast__show')
        setTimeout(() => toast.classList.add('toast__open'), 10);
    })
    return (
        <div id='toast' className='toast__wrapper'>
            <div className='toast__content'>
                <p className='toast__text'>{props.notification}</p>
                <div className='toast__cross' onClick={ToastManager.removeCallback}>
                    <img src = {close} alt = "close-button"/>
                </div>
            </div>
        </div>
    )
}


export default Toast