import { useContext, useState } from "react";
import InputArea from "../InputArea/InputArea";
import { TableGroupContext, TableState } from "../../pages/MarksTable/MarksTable";
import { handleKeyDown } from "./TaskPreviewHooks";
// @ts-ignore
import taskIcon from './Icons/taskIcon.svg'

import './TaskPreview.scss'
import { showDropDownByTaskId } from "../DropDown/DropDownHooks";


interface TaskPreviewProps {
    id: number,
    date: Date,
    onDelete?: boolean
}
const TaskPreview = (props: TaskPreviewProps) => {
    const context = useContext(TableGroupContext)
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

    /*onDoubleClick={() => setIsOnChange(true)}*/
    return (
        <th className="taskLabel"
            onClick={(e) => context.state === TableState.default && showDropDownByTaskId(props.id, e)}
            onKeyDown={(e) => e.key === 'Enter' && handleKeyDown(e, props.id, setIsOnChange, context.setTasks)}
        >
            {
                props.onDelete &&
                <InputArea key={'checkbox' + props.id} 
                        id={'checkbox' + props.id}
                        type="checkbox"/>
            }
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
