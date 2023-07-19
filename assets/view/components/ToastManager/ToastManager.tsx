import Toast, {ToastProps} from "./Toast/Toast";
import {createRoot, Root} from "react-dom/client";

type TToast = {

}
abstract class ToastManager {
    private static root: Root;
    private static toast: Array<JSX.Element> = [];

    public static init(): void {
        const node = document.createElement('div')
        this.root = createRoot(document.appendChild(node))
    }
    public static add({notification}: ToastProps, expTime: number) {
        this.root.render(<Toast notification={notification} />)
        setTimeout(() => this.remove(), expTime)
    }
    public static remove(): void {
        this.root.unmount();
        this.init();
    }
}

export default ToastManager