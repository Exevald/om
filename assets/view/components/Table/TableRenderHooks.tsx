import {Task} from "../../../utility/types"
import { TableState } from "../../pages/MarksTable/MarksTable"
import InputArea from "../InputArea/InputArea"
import TaskPreview from "../TaskPreview/TaskPreview"
import {addMark, changeTaskMaxMarkHandler} from "./TableHooks"
import React from "react";

function generateTaskBody(
    studentsIds: Array<number>,
    tasks: Array<Task>,
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>,
    groupId: string
) {
    const tasksBody: Array<JSX.Element> = []
    let marksRow: Array<JSX.Element> = []
    studentsIds.forEach(studentId => {

        tasks.forEach(task => {
            if(task.marks) {

                let hasMark = false

                for(let i = 0; task.marks.length; i++) {
                    if(task.marks[i].studentId === studentId) {
                        hasMark = true
                        marksRow.push(
                            <td key={task.id + ' ' + studentId} onKeyDown={
                                (e) => e.key === 'Enter' && console.log('изменение оценки')}
                            >
                                <InputArea key={task.id + ' ' + studentId}
                                           id={task.id + ' ' + studentId}
                                           type="mark"
                                           value={task.marks[i].studentMark.toString()}
                                />
                            </td>
                        )
                        break
                    }
                }

                if (!hasMark) {
                    marksRow.push(
                        <td key={task.id + ' ' + studentId} onKeyDown={(e) => e.key === 'Enter' &&
                            addMark(task.id, studentId, setTasks, groupId)}
                        >
                            <InputArea key={task.id + ' ' + studentId}
                                       id={task.id + ' ' + studentId}
                                       type="mark"
                                       value={''}
                            />
                        </td>
                    )
                }

            } else {
                marksRow.push(
                    <td key={task.id + ' ' + studentId} onKeyDown={(e) => e.key === 'Enter' &&
                            addMark(task.id, studentId, setTasks, groupId)}
                    >
                        <InputArea key={task.id + ' ' + studentId}
                                   id={task.id + ' ' + studentId}
                                   type="mark"
                                   value={''}/>
                    </td>
                )
            }

        })
        marksRow.push(<td key={-1} className="table__markPlug"></td>)
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


function updateTableMargins(state: TableState) {
    const table = document.querySelector('.table__tables') as HTMLTableElement
    const tableStudents = document.querySelector('.table__students') as HTMLTableElement
    const tableFinalMarks = document.querySelector('.table__finalMarks') as HTMLTableElement
    if (state === TableState.delete) {
        table.style.marginTop = 29 + 'px'
        tableStudents.style.marginTop = 64 + 'px'
        tableFinalMarks.style.marginTop = 64 + 'px'
    }
    if (state === TableState.default) {
        table.style.marginTop = 93 + 'px'
        tableStudents.style.marginTop = 0 + 'px'
        tableFinalMarks.style.marginTop = 0 + 'px'
    }
}


export {generateTaskBody, generateTaskHead, generateTaskMaxMarks, updateTableMargins}