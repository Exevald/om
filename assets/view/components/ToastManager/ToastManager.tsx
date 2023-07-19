import Toast from "./Toast/Toast";
import {createRoot, Root} from "react-dom/client";
import {TOAST_ANIMATION_TIME} from "../../../utility/utilities";

type TToast = {

}
abstract class ToastManager {
    private static node: HTMLDivElement = document.createElement('div') as HTMLDivElement
    private static root: Root = createRoot(document.body.appendChild(this.node))
    private static init() {
        this.node = document.createElement('div') as HTMLDivElement
        this.root = createRoot(document.body.appendChild(this.node))
    }
    public static add(notification: string, expTime: number) {
        this.root.render(<Toast notification={notification} />)
        setTimeout(()=>{
            let closeTimer = setTimeout(() => this.remove(), expTime);
            this.initToast(closeTimer);
            },10)
    }

    private static initToast(Timer: NodeJS.Timeout): void{
        let cross = this.node.querySelector(".toast__cross") as HTMLElement;
        let toast = document.getElementById('toast') as HTMLElement;
        toast.classList.add('toast__show')
        setTimeout(() => toast.classList.add('toast__open'), 10);
        if(cross){
            cross.addEventListener('click', ()=> {
                toast.classList.remove('toast__open');
                setTimeout(() => this.remove(), 50);
                clearTimeout(Timer);
            }, {once: true})
        }
    }

    public static remove(): void {
        let toast = document.getElementById('toast') as HTMLElement;
        if(toast)
        toast.classList.remove('toast__open');
        setTimeout(()=>{
            this.root.unmount()
            document.body.removeChild(this.node)
            this.init()
        }, TOAST_ANIMATION_TIME)
    }
}

export default ToastManager