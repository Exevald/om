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
        <div className="" onClick={props.onClick}>
            <span>props.date</span>
            <img className="taskIcon"
                 src={taskIcon}
                 alt="Подробнее"
                 />
        </div>
    )
}


export default TaskPreview
