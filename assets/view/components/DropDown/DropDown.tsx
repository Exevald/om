import { useState } from "react"
import InputArea from "../InputArea/InputArea"

import './DropDown.scss'
import { Task } from "../../../utility/types"

interface DropDownProps {
    taskId: number,
    topic: string,
    description: string
}

const DropDown = (props: DropDownProps) => {
    const [isTopicOnChange, setIsTopicOnChange] = useState(false)
    const [isDescriptionOnChange, setIsDescriptionOnChange] = useState(false)
    return (
        <div id={'dropdown' + props.taskId} className="dropdown__wrapper">
            <div className="dropdown__content">
                { isTopicOnChange ? 
                    <InputArea id={'topic' + props.taskId} 
                        type="taskTopic" 
                        value={props.topic} 
                        widthChangeable/>
                    :
                    <h6 onDoubleClick={() => setIsTopicOnChange(true)}>{props.topic}</h6>
                }
                { isDescriptionOnChange ?
                    <InputArea id={'description' + props.taskId} 
                        type="taskDescription" 
                        value={props.description} 
                        widthChangeable/>
                    :
                    <p onDoubleClick={() => setIsDescriptionOnChange(true)}>{props.description}</p>
                }
            </div>
        </div>
    )
}


interface DropDownListProps {
    tasks: Array<Task>
}
const DropDownList = (props: DropDownListProps) => {
    return (
        <>
            { props.tasks.map(task =>
                    <DropDown key={task.id} taskId={task.id} topic={task.topic} description={task.description}/>
                )
            }
        </>
    )
}


export default DropDown
export { DropDownList }