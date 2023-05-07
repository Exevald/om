import React, { useState } from "react";
import {  Mark, Student } from "../../../utility/types";

import './Table.scss'


interface TableHeaderProps {
    subject: string,

}
const TableHeader = (props: TableHeaderProps) => {
    return (
        <thead className="table__head">
            <td>{props.subject}</td>
            <td>Итого</td>
        </thead>
    )
}

interface TableRowProps {
    student: Student,
    marks: Array<Mark>
}
const TableRow = (props: TableRowProps) => {
    const marks = props.marks.map(mark => 
        <td>
            {mark.studentMark}
        </td>
    );
    return (
        <tr>
            <td>
                {props.student.name} {props.student.surname}
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
    const [marks, setMarks] = useState(response.marks)
    return(
        <table>
            <TableHeader subject={props.subject}/>
            <tbody>
                <TableRow student={props.students[0]} marks={response.marks} />
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
        {id: 0, surname: 'Шиханова',       name: 'Дарья'},
        {id: 1, surname: 'Викторов',       name: 'Роберт'},
        {id: 2, surname: 'Баянова',        name: 'Наталия'},
        {id: 3, surname: 'Грустный',       name: 'Павел'},
        {id: 4, surname: 'Зелепупкович',   name: 'Афанасий'},
        {id: 5, surname: 'Апполинарьев',   name: 'Владлен'},
    ],
    marks: [
        {id: 0, studentId: 2, studentMark: 5},
        {id: 1, studentId: 2, studentMark: 4},
        {id: 2, studentId: 1, studentMark: 0}
    ],
    Tasks: [
        {
            id: 0, topic: 'Контрольная работа', description: 'Контрольная работа по теме "Тонкие плёнки"',
        }
    ]
}