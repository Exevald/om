import { useState } from 'react'

import 'Toast.scss'

interface ToastProps {
    notification: string,
    showTime: number
}
const Toast = (props: ToastProps) => {
    const [isVisible, setIsVisible] = useState(true)
    setTimeout(() => setIsVisible(false), props.showTime)
    return (
        <>
        {

        }
            <div>
            </div>
        </>
    )
}