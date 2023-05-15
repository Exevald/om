import React, { useContext } from "react";
import {Student, Task} from "../../../utility/types";

import './Table.scss'
import TaskPreview from "../TaskPreview/TaskPreview";
import InputArea from "../InputArea/InputArea";
import { changeTaskMaxMarkHandler } from "./TableHooks";
import { TableGroupContext } from "../../pages/MarksTable/MarksTable";


interface StudentTableProps {
    subject: string,
    students: Array<Student>
}

const StudentsTable = (props: StudentTableProps) => {
    return (
        <table className="table__wrapper table__students">
            <thead>
            <tr>
                <th><strong>{props.subject}</strong></th>
            </tr>
            </thead>
            <tbody>
            {
                props.students.map(student =>
                    <tr key={student.id}>
                        <td>
                            {student.lastName} {student.firstName}
                        </td>
                    </tr>
                )
            }
            <tr>
                <td>󠇮</td>
            </tr>
            </tbody>
        </table>
    )
}

interface TasksTableProps {
    tasks: Array<Task>,
    studentsIds: Array<number>
}

const TasksTable = (props: TasksTableProps) => {
    const context = useContext(TableGroupContext)
    const tasksHead: Array<JSX.Element> = [], 
          tasksBody: Array<JSX.Element> = [], 
          tasksMaxMarks: Array<JSX.Element> = []
    let marksRow: Array<JSX.Element> = []
    props.tasks.forEach(task => {
        tasksHead.push(
            <TaskPreview key={task.id} id={task.id} date={task.date}/>
        )
        tasksMaxMarks.push(
            <td key={task.id} onKeyDown={(e) => e.key === 'Enter' && changeTaskMaxMarkHandler(task.id, context.setTasks)}>
                <InputArea id={'maxMark' + task.id} type="mark" value={task.maxMark}/>
            </td>
        )
    })
    //заглушка на оставшееся место
    tasksHead.push(
        <th key={-1} className="table__plug">󠇮</th>
    )
    props.studentsIds.forEach(studentId => {
        props.tasks.forEach(task => {
            marksRow.push(
                    <td key={task.id + ' ' + studentId}>
                        <InputArea id={task.id + ' ' + studentId} type="mark" value={'00'}/>
                    </td>
            )
        })
        marksRow.push(<td className="table__markPlug"></td>)
        tasksBody.push(
            <tr key={studentId}>
                {marksRow}
            </tr>
        )
        marksRow = []
    })
    return (
        <table className="table__wrapper table__tasks">
            <thead>
            <tr>{tasksHead}</tr>
            </thead>
            <tbody>
                {tasksBody}
                <tr>
                    {tasksMaxMarks}
                </tr>
            </tbody>
        </table>
    )
}


interface FinalMarksTableProps {
    tasks: Array<Task>,
    countOfRows: number
}

const FinalMarksTable = (props: FinalMarksTableProps) => {
    let finalMarks: Array<JSX.Element> = []
    for (let i = 0; i < props.countOfRows; i++) {
        // здесь рендер финальной оценки
        finalMarks.push(
            <tr key={i}>
                <td><strong>{i}</strong></td>
            </tr>
        )
    }
    finalMarks.push(
        <tr key={finalMarks.length + 1}>
            <td>100</td>
        </tr>
    )
    return (
        <table className="table__wrapper table__finalMarks">
            <thead>
            <tr>
                <th><strong>Итого</strong></th>
            </tr>
            </thead>
            <tbody>
            {finalMarks}
            </tbody>
        </table>
    )
}


interface TableProps {
    subject: string,
    students: Array<Student>,
    tasks: Array<Task>
}

const Table = (props: TableProps) => {
    return (
        <div className="table__tables">
            <StudentsTable subject={props.subject} students={props.students}/>
            <TasksTable tasks={props.tasks} studentsIds={props.students.map(student => parseInt(student.id))}/>
            <FinalMarksTable tasks={props.tasks} countOfRows={props.students.length}/>
        </div>
    )
}

export default Table
