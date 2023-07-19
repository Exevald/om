import { createRoot } from 'react-dom/client'
import { TOAST_ANIMATION_TIME } from '../../../../utility/utilities'

import './Toast.scss'
import ToastManager from "../ToastManager";


interface ToastProps {
    notification: string
}
const Toast = (props: ToastProps) => {
    return (
        <div id='toast' className='toast__wrapper'>
            <div className='toast__content'>
                <p>{props.notification}</p>
            </div>
            <p onClick={() => ToastManager.remove()} >x</p>
        </div>
    )
}


export default Toast
export { ToastProps }