import React from "react";
import {createRoot, Root} from 'react-dom/client'
import { TOAST_ANIMATION_TIME } from '../../../../utility/utilities'

import './Toast.scss';

// @ts-ignore
import close from "./close.svg"

interface ToastProps {
    notification: string
}
const Toast = (props: ToastProps) => {
    return (
        <div id='toast' className='toast__wrapper'>
            <div className='toast__content'>
                <p className='toast__text'>{props.notification}</p>
                <div className='toast__cross'>
                    <img src = {close} alt = "close-button"/>
                </div>
            </div>
        </div>
    )
}

function closeToast(toast: HTMLElement, toastRoot: Root, toastNode: HTMLDivElement, closeTime: number){

    setTimeout(() => {
        if(toastNode.parentNode === document.body){
            console.log('closed')
            toastRoot.unmount()
            document.body.removeChild(toastNode)
        }
    }, closeTime + TOAST_ANIMATION_TIME);
}

function showToast(message: string, showTime: number) {
    const toastNode = document.createElement('div')
    const toastRoot = createRoot(document.body.appendChild(toastNode))
    toastRoot.render( 
        <Toast notification={message}/>
    )
    let toast: HTMLElement;
    setTimeout(() => {
        toast = document.getElementById('toast') as HTMLElement;

        toast.classList.add('toast__show')
        setTimeout(() => toast.classList.add('toast__open'), 10);

        let toastCross = toastNode.querySelector(".toast__cross")
        if (toastCross) {
            toastCross.addEventListener('click', () => {
                closeToast(toast, toastRoot, toastNode, 20);
            }, {once: true})
        }
        setTimeout(() => {
            if(toast.classList.contains('toast__open')){
                toast.classList.remove('toast__open')
                console.log('closed T')
            }
        }, showTime)

    }, 10);
}


export default Toast
export { showToast }