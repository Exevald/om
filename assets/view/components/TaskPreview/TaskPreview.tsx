import { useContext, useState } from "react";
import InputArea from "../InputArea/InputArea";
import { TableGroupContext } from "../../pages/MarksTable/MarksTable";
import { handleKeyDown } from "./TaskPreviewHooks";
// @ts-ignore
import taskIcon from './Icons/taskIcon.svg'

import './TaskPreview.scss'


interface TaskPreviewProps {
    id: number,
    date: Date,
    onClick?: () => void
}
const TaskPreview = (props: TaskPreviewProps) => {
    const [isOnChange, setIsOnChange] = useState(false);
    let date = new Date(props.date).getDate().toString()
    if (parseInt(date, 10) < 10) {
        date = "0" + date
    }
    let month = (new Date(props.date).getMonth() + 1).toString()
    if (parseInt(month, 10) < 10) {
        month = "0" + month
    }
    const finalDate = date + "." + month

    const context = useContext(TableGroupContext)
    return (
        <th className="taskLabel"
            onClick={props.onClick}
            onDoubleClick={() => setIsOnChange(true)}
            onKeyDown={(e) => e.key === 'Enter' && handleKeyDown(e, props.id, setIsOnChange, context.setTasks)}
        >
            {
                isOnChange ?
                    <InputArea id={"taskLabel" + props.id} type='taskLabel' value={finalDate}/>
                :
                    <span>{finalDate}</span>
            }
            <img className="taskIcon"
                 src={taskIcon}
                 alt="Подробнее"
                 />
        </th>
    )
}


export default TaskPreview
