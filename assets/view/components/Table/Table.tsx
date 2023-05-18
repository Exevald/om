import {useContext, useEffect} from "react";
import {Student, Task} from "../../../utility/types";
import {TableGroupContext} from "../../pages/MarksTable/MarksTable";
import {generateTaskHead, generateTaskBody, generateTaskMaxMarks, generateFinalMarks} from "./TableRenderHooks";
import {DropDownList} from "../DropDown/DropDown";

import './Table.scss'


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
    let tasksHead: Array<JSX.Element> = generateTaskHead(props.tasks, context.state)
    const tasksBody: Array<JSX.Element> = generateTaskBody(
        props.studentsIds, props.tasks, context.setTasks, context.groupId
    )
    const tasksMaxMarks: Array<JSX.Element> = generateTaskMaxMarks(
        props.tasks, context.setTasks, context.groupId
    )

    useEffect(() => {
        tasksHead = generateTaskHead(props.tasks, context.state)
    }, [context.state])

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

function getFinalMarks(): Array<number> {
    const tasksTable = document.getElementsByClassName('table__tasks')[0] as HTMLTableElement

    let taskMaxMarks = [], studentMarkSum = 0, delta = 0, maxMarkSum = 0, studentFinalMarks = []

    for (let j = 0; j < tasksTable.rows[tasksTable.rows.length - 1].cells.length; j++) {
        let cell = (tasksTable.rows[tasksTable.rows.length - 1].cells[j].firstElementChild as HTMLInputElement).value
        maxMarkSum += parseInt(cell, 10)
        taskMaxMarks[j] = parseInt(cell)
    }

    for (let i = tasksTable.rows.length - 2; i > 0; i--) {
        delta = maxMarkSum
        studentMarkSum = 0
        for (let j = 0; j < tasksTable.rows[i].cells.length; j++) {
            let cell = tasksTable.rows[i].cells[j].firstElementChild as HTMLInputElement
            if (cell) {
                if (cell.value === '' || cell.value === 'Н') {
                    delta -= taskMaxMarks[j]
                } else {
                    if (cell.value !== 'Н0') {
                        studentMarkSum += parseInt(cell.value)
                    }
                }
            }
        }
        studentFinalMarks.push(Math.ceil(studentMarkSum / delta * 100))
    }
    console.log(studentFinalMarks)
    return studentFinalMarks
}

const FinalMarksTable = (props: FinalMarksTableProps) => {
    let finalMarks: Array<JSX.Element> = []
    let finalMarksList: Array<number> = []
    
    for (let i = 0; i < props.countOfRows; i++) {
        // здесь рендер финальной оценки
        finalMarks.push(
            <tr key={i}>
                <td><strong>{i}</strong></td>
            </tr>
        )
    }

    useEffect(() => {
        finalMarksList = getFinalMarks()
        finalMarks = generateFinalMarks(finalMarksList)
    }, [props.tasks])

    return (
        <table className="table__wrapper table__finalMarks">
            <thead>
            <tr>
                <th><strong>Итого</strong></th>
            </tr>
            </thead>
            <tbody>
            {finalMarks}
            <tr>
                <td>100</td>
            </tr>
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
            <DropDownList tasks={props.tasks}/>
            <StudentsTable subject={props.subject} students={props.students}/>
            <TasksTable tasks={props.tasks}
                        studentsIds={props.students.map(student => parseInt(student.id))}
            />
            <FinalMarksTable tasks={props.tasks} countOfRows={props.students.length}/>
        </div>
    )
}

export default Table
