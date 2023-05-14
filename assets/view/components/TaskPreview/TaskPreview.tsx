import React, { useState } from "react";
// @ts-ignore
import taskIcon from './Icons/taskIcon.svg'

import './TaskPreview.scss'
import InputArea from "../InputArea/InputArea";
import { Task } from "../../../utility/types";


function handleKeyDown(
    event: React.KeyboardEvent,
    id: number,
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>
) {
    if (event.key === 'Enter') {
        
    }
}

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
    return (
        <th className="taskLabel"
            onClick={props.onClick}
            onDoubleClick={() => setIsOnChange(true)}
            onKeyDown={(e) => e.key === 'Enter' && setIsOnChange(false)}
        >
            {
                isOnChange ?
                    <InputArea id={"taskLabel" + props.id} type='mark'  value={finalDate}/>
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
