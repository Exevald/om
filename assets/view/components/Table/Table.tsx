import React from "react";
import {  Group, Student, Task } from "../../../utility/types";

import './Table.scss'


interface StudentTableProps {
    subject: string,
    students: Array<Student>
}
const StudentsTable = (props: StudentTableProps) => {
    return (
        <table className="table__wrapper">
            <thead><tr><td>{props.subject}</td></tr></thead>
            <tbody>
                {
                    props.students.map(student => 
                        <tr key={student.id}>
                            <td>
                                {student.firstName} {student.lastName}
                            </td>
                        </tr>
                    )
                }
                    <tr><td>󠇮</td></tr>
            </tbody>
        </table>
    )
}

interface TasksTableProps {
    tasks: Array<Task>,
    countOfRows: number
}
const TasksTable = (props: TasksTableProps) => {
    const tasksHead = props.tasks.map(task =>
        <th key={task.id}>{task.id}</th>
    )
    tasksHead.push(
        <th key={-1}></th>
    )
    const tasksRows = props.tasks.map(task => <tr></tr>)
    return (
        <table className="table__wrapper table__tasks">
            <thead>
                <tr>{tasksHead}</tr>
            </thead>
            <tbody>

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
                <td>{i}</td>
            </tr>
        )
    }
    finalMarks.push(
        <tr key={finalMarks.length + 1}>
            <td>100</td>
        </tr>
    )
    return (
        <table className="table__wrapper">
            <thead><tr><td><strong>Итого</strong></td></tr></thead>
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
    return(
        <div className="table__tables">
            <StudentsTable subject={props.subject} students={props.students}/>
            <TasksTable tasks={props.tasks} countOfRows={props.students.length}/>
            <FinalMarksTable tasks={props.tasks} countOfRows={props.students.length}/>
        </div>
    )
}

export default Table
