import React from "react";
import {Group, Student, Task} from "../../../utility/types";

import './Table.scss'
import TaskPreview from "../TaskPreview/TaskPreview";


interface StudentTableProps {
    subject: string,
    students: Array<Student>
}

const StudentsTable = (props: StudentTableProps) => {
    return (
        <table className="table__wrapper">
            <thead className="table__head">
            <tr>
                <th><strong>{props.subject}</strong></th>
            </tr>
            </thead>
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
            <tr>
                <td>󠇮</td>
            </tr>
            </tbody>
        </table>
    )
}

interface TasksTableProps {
    tasks: Array<Task>,
    countOfRows: number
}

const TasksTable = (props: TasksTableProps) => {
    const tasksHead = []
    props.tasks.forEach(task => {
        let date = new Date(task.date).getDate().toString()
        if (parseInt(date, 10) < 10) {
            date = "0" + date
        }
        let month = (new Date(task.date).getMonth() + 1).toString()
        if (parseInt(month, 10) < 10) {
            month = "0" + month
        }
        const finalDate = date + "." + month
        tasksHead.push(
            <TaskPreview key={task.id} date={finalDate}/>
        )
    })
    tasksHead.push(
        <th key={-1}></th>
    )
    return (
        <table className="table__wrapper table__tasks">
            <thead className="table__head">
            <tr>{tasksHead}</tr>
            </thead>
            <tbody>
            <tr>
                <td>
                </td>
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
            <thead className="tabel__head">
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
            <TasksTable tasks={props.tasks} countOfRows={props.students.length}/>
            <FinalMarksTable tasks={props.tasks} countOfRows={props.students.length}/>
        </div>
    )
}

export default Table
