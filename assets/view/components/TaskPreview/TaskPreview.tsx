import React from "react";
// @ts-ignore
import taskIcon from './taskIcon.svg'

import './TaskPreview.scss'


interface TaskPreviewProps {
    date: Date,
    onClick?: () => void
}
const TaskPreview = (props: TaskPreviewProps) => {
    return (
        <th className="taskLabel" onClick={props.onClick}>
            <span>01.01</span>
            <img className="taskIcon"
                 src={taskIcon}
                 alt="Подробнее"
                 />
        </th>
    )
}


export default TaskPreview
