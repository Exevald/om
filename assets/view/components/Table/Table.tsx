import React, { useState } from "react";
import {  Mark, Student, Task } from "../../../utility/types";

import './Table.scss'


interface TableHeaderProps {
    subject: string,

}
const TableHeader = (props: TableHeaderProps) => {
    return (
        <thead className="table__head">
            <tr>
                <th>{props.subject}</th>
                <th>Итого</th>
            </tr>
        </thead>
    )
}

interface TableRowProps {
    student: Student,
    marks: Array<Mark>,
    tasks: Array<Task>
}
const TableRow = (props: TableRowProps) => {
    const marks = props.marks.map(mark => 
        <td key={mark.id} >
            {mark.studentMark}
        </td>
    );
    return (
        <tr>
            <td>
                {props.student.firstName} {props.student.lastName}
            </td>
            {marks}
        </tr>
    )
}


interface TableProps {
    subject: string,
    students: Array<Student>
}
const Table = (props: TableProps) => {
    let marks = response.marks;
    let tasks = response.tasks;
    return(
        <table className="table__wrapper">
            <TableHeader subject={props.subject}/>
            <tbody className="table__body">
                <TableRow student={props.students[0]} marks={response.marks} tasks={tasks} />
            </tbody>
        </table>
    )
}

export default Table

// заглушка для данных по группе
const response = {
    group: {
        name: '11 класс',
        subject: 'Физика'
    },
    students: [
        {id: 0, lastName: 'Шиханова',       firstName: 'Дарья'},
        {id: 1, lastName: 'Викторов',       firstName: 'Роберт'},
        {id: 2, lastName: 'Баянова',        firstName: 'Наталия'},
        {id: 3, lastName: 'Грустный',       firstName: 'Павел'},
        {id: 4, lastName: 'Зелепупкович',   firstName: 'Афанасий'},
        {id: 5, lastName: 'Апполинарьев',   firstName: 'Владлен'},
    ],
    marks: [
        {id: 0, studentId: 2, studentMark: 5},
        {id: 1, studentId: 2, studentMark: 4},
        {id: 2, studentId: 1, studentMark: 0}
    ],
    tasks: [
        {
            id: 0, topic: 'Контрольная работа', 
            description: 'Контрольная работа по теме "Интерференция в тонких плёнках"',
            maxMark: 30,
            marksList: [0, 2]
        }
    ]
}