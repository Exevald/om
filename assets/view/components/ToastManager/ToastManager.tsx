import Toast from "./Toast/Toast";
import {createRoot, Root} from "react-dom/client";
import {TOAST_ANIMATION_TIME} from "../../../utility/utilities";


abstract class ToastManager {
    private static node: HTMLDivElement
    private static root: Root
    private static timer: NodeJS.Timer
    private static init() {
        this.node = document.createElement('div') as HTMLDivElement
        this.root = createRoot(document.body.appendChild(this.node))
    }
    public static add(notification: string, expTime: number) {
        if (this.node === undefined) {
            this.init()
        } else if (this.node.childElementCount > 0) {
            // если уже есть, то удаляем прошлый и ставим позже новый
            clearTimeout(this.timer)
        }
        this.timer = setTimeout(this.removeCallback, expTime)
        this.root.render(<Toast notification={notification} />)
    }

    public static removeCallback = () => this.remove()
    public static remove(): void {
        let toast = document.getElementById('toast') as HTMLElement;
        if(toast?.classList.contains('toast__open')) {
            toast.classList.remove('toast__open');
        }
        setTimeout(()=>{
            this.root.unmount()
            document.body.removeChild(this.node)
            console.log('remove')
            this.init()
            clearTimeout(this.timer)
        }, TOAST_ANIMATION_TIME)
    }
}

export default ToastManager