import { createRoot } from 'react-dom/client'
import { TOAST_ANIMATION_TIME } from '../../../utility/utilities'

import './Toast.scss'


interface ToastProps {
    notification: string
}
const Toast = (props: ToastProps) => {
    return (
        <div id='toast' className='toast__wrapper'>
            <div className='toast__content'>
                <p>{props.notification}</p>
            </div>
        </div>
    )
}

function showToast(message: string, showTime: number) {
    const toastNode = document.createElement('div')
    const toastRoot = createRoot(document.body.appendChild(toastNode))
    toastRoot.render( 
        <Toast notification={message}/>
    )
    let toast: HTMLElement;
    setTimeout(() => {
        toast = document.getElementById('toast') as HTMLElement
        toast.classList.add('toast__show')
        setTimeout(() => toast.classList.add('toast__open'), 10)
    }, 10)
    setTimeout(() => {
        toast.classList.remove('toast__open')
    }, showTime - 20 )
    setTimeout(() => {
        toastRoot.unmount()
        document.body.removeChild(toastNode)
    }, showTime - 20 + TOAST_ANIMATION_TIME)
}


export default Toast
export { showToast }