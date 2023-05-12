import React, { useState } from "react";
import {  Group, Student, Task } from "../../../utility/types";

import './Table.scss'
import { TableState } from "../../pages/MarksTable/MarksTable";


interface TableHeaderProps {
    subject: string,
    tasks: Array<Task>
}
const TableHeader = (props: TableHeaderProps) => {
    return (
        <thead className="table__head">
            <tr>
                <th>{props.subject}</th>
                {
                    props.tasks.map(task =>
                        <th key={task.id}>{task.topic}</th>    
                    )
                }
                <th>Итого</th>
            </tr>
        </thead>
    )
}

interface TableRowProps {
    student: Student,
    tasks: Array<Task>
}
const TableRow = (props: TableRowProps) => {
    return (
        <tr>
            <td>
                {props.student.firstName} {props.student.lastName}
            </td>
        </tr>
    )
}


interface TableProps {
    group: Group,
    setState: React.Dispatch<React.SetStateAction<TableState>>,
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>
}
const Table = (props: TableProps) => {
    console.log(props.group)
    const rows = props.group.studentsList.map(student => 
        <TableRow key={student.id} student={student} tasks={props.group.tasksList}/>
    )
    return(
        <table className="table__wrapper">
            <TableHeader subject={props.group.subject} tasks={props.group.tasksList}/>
            <tbody className="table__body">
                {rows}
            </tbody>
        </table>
    )
}

export default Table
