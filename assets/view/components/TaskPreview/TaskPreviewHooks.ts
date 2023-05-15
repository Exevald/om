import { changeTaskDate } from "../../../api/requests";
import { Task } from "../../../utility/types";


function handleKeyDown(
    event: React.KeyboardEvent,
    id: number,
    setIsOnChange: React.Dispatch<React.SetStateAction<boolean>>,
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>
) {
    if (event.key === 'Enter') {
        const date = (document.getElementById('taskLabel' + id) as HTMLInputElement).value
        changeTaskDate(id.toString(), new Date(date))
            .then(() =>
                setIsOnChange(false)
            )
    }
}


export { handleKeyDown }