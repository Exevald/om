import { useContext, useEffect } from "react";
import {Student, Task} from "../../../utility/types";
import { TableGroupContext } from "../../pages/MarksTable/MarksTable";
import { generateTaskHead, generateTaskBody, generateTaskMaxMarks } from "./TableRenderHooks";
import { DropDownList } from "../DropDown/DropDown";

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
    let     tasksHead: Array<JSX.Element>     = generateTaskHead(props.tasks, context.state)
    const   tasksBody: Array<JSX.Element>     = generateTaskBody(props.studentsIds, props.tasks.map(task => task.id)), 
            tasksMaxMarks: Array<JSX.Element> = generateTaskMaxMarks(
                props.tasks, context.state, context.setTasks, context.groupId
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
            <DropDownList tasks={props.tasks}/>
            <StudentsTable subject={props.subject} students={props.students}/>
            <TasksTable tasks={props.tasks} studentsIds={props.students.map(student => parseInt(student.id))}/>
            <FinalMarksTable tasks={props.tasks} countOfRows={props.students.length}/>
        </div>
    )
}

export default Table
