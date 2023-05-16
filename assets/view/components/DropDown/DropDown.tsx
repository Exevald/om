import { useContext, useEffect, useState } from "react"
import InputArea from "../InputArea/InputArea"

import './DropDown.scss'
import { Task } from "../../../utility/types"
import { TableGroupContext } from "../../pages/MarksTable/MarksTable"
import { setTaskInitials } from "../Table/TableHooks"
import { DROPDOWN_ANIMATION_TIME } from "../../../utility/utilities"

interface DropDownProps {
    taskId: number,
    topic: string,
    description: string
}

const DropDown = (props: DropDownProps) => {
    const context = useContext(TableGroupContext)
    const [isInitialsOnChange, setIsInitialsOnChange] = useState(false)
    return (
        <div id={'dropdown' + props.taskId} className="dropdown__wrapper">
            <div className="dropdown__content"onKeyDown={(e) => e.key === 'Enter' &&
                    setTaskInitials(props.taskId, context.groupId, context.setTasks, setIsInitialsOnChange)
            }>
                { 
                    isInitialsOnChange ? 
                    <>
                        <InputArea id={'topic' + props.taskId} 
                            type="taskTopic" 
                            value={props.topic} 
                            widthChangeable
                        />
                        <InputArea id={'description' + props.taskId} 
                            type="taskDescription" 
                            value={props.description} 
                            widthChangeable
                        />
                    </>
                    :
                    <>
                        <h6 onDoubleClick={() => setIsInitialsOnChange(true)}>{props.topic}</h6>
                        <p onDoubleClick={() => setIsInitialsOnChange(true)}>{props.description}</p>
                    </>
                }
            </div>
        </div>
    )
}


interface DropDownListProps {
    tasks: Array<Task>
}
const DropDownList = (props: DropDownListProps) => {
    const dropDowns: Array<JSX.Element> = props.tasks.map(task =>
        <DropDown key={task.id} taskId={task.id} topic={task.topic} description={task.description}/>
    )

    function closeDropDownsByTasksIdsListener(e: MouseEvent) {
        const path = e.composedPath()
        props.tasks.forEach(task => {
            const dropdown = document.getElementById('dropdown' + task.id) as HTMLInputElement
            if (!path.includes(dropdown) && dropdown.classList.contains('dropdown__show')) {
                dropdown.classList.remove('dropdown__open')
                setTimeout(() => dropdown.classList.remove('dropdown__show'), DROPDOWN_ANIMATION_TIME)
            }
        })
    }

    useEffect(() => {
        document.body.addEventListener('click', closeDropDownsByTasksIdsListener)
        return () => document.body.removeEventListener('click', closeDropDownsByTasksIdsListener) 
    })
    return (
        <>
            {dropDowns}
        </>
    )
}


export default DropDown
export { DropDownList }