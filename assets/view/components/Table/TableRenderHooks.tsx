import { Task } from "../../../utility/types"
import { DEFAULT_TASKTABLE_WIDTH } from "../../../utility/utilities"
import { TableState } from "../../pages/MarksTable/MarksTable"
import InputArea from "../InputArea/InputArea"
import TaskPreview from "../TaskPreview/TaskPreview"
import { changeTaskMaxMarkHandler } from "./TableHooks"

function generateTaskBody(studentsIds: Array<number>, tasksIds: Array<number>) {
    const tasksBody: Array<JSX.Element> = []
    let marksRow: Array<JSX.Element> = []
    studentsIds.forEach(studentId => {
        tasksIds.forEach(taskId => {
            marksRow.push(
                    <td key={taskId + ' ' + studentId}>
                        <InputArea key={taskId + ' ' + studentId} 
                            id={taskId + ' ' + studentId} 
                            type="mark" 
                            value={'0'}/>
                    </td>
            )
        })
        marksRow.push(<td key={-1 * marksRow.length} className="table__markPlug"></td>)
        tasksBody.push(
            <tr key={studentId}>
                {marksRow}
            </tr>
        )
        marksRow = []
    })
    return tasksBody
}


function generateTaskMaxMarks(
    tasks: Array<Task>,
    state: number,
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>,
    groupId: string
) {
    const tasksMaxMarks: Array<JSX.Element> = []
    tasks.forEach(task => 
        tasksMaxMarks.push(
            <td key={task.id} onKeyDown={(e) => e.key === 'Enter' &&
                changeTaskMaxMarkHandler(task.id, setTasks, groupId)
            }>
                <InputArea key={task.id} 
                    id={'maxMark' + task.id} 
                    type="mark" 
                    value={task.maxMark.toString()}/>
            </td>
        )
    )
    return tasksMaxMarks
}


function generateTaskHead(tasks: Array<Task>, state: number) {
    const tasksHead: Array<JSX.Element> = []
    if (state === TableState.delete) {
        tasks.forEach(task => 
            tasksHead.push(
                <TaskPreview key={task.id} id={task.id} date={task.date} onDelete/>
            )
        )
    } else {
        tasks.forEach(task => 
            tasksHead.push(
                <TaskPreview key={task.id} id={task.id} date={task.date}/>
            )
        )
    }
    if(tasksHead.length === 0) {
        tasksHead.push(<p></p>)
    }
    //заглушка на оставшееся место
    tasksHead.push(
        <th key={-1} className="table__plug">󠇮</th>
    )
    return tasksHead
}


export {generateTaskBody, generateTaskHead, generateTaskMaxMarks}