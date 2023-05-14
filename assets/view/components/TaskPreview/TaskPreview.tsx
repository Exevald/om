import React from "react";
// @ts-ignore
import taskIcon from './Icons/taskIcon.svg'

import './TaskPreview.scss'


interface TaskPreviewProps {
    date: Date,
    onClick?: () => void
}
const TaskPreview = (props: TaskPreviewProps) => {
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
        <th className="taskLabel" onClick={props.onClick}>
            <span>{finalDate}</span>
            <img className="taskIcon"
                 src={taskIcon}
                 alt="Подробнее"
                 />
        </th>
    )
}


export default TaskPreview
