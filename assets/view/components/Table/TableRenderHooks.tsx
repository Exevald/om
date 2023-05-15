import { Task } from "../../../utility/types"
import InputArea from "../InputArea/InputArea"

function generateTaskBody(studentsIds: Array<number>, tasks: Array<Task>) {
    const tasksBody: Array<JSX.Element> = []
    let marksRow: Array<JSX.Element> = []
    studentsIds.forEach(studentId => {
        tasks.forEach(task => {
            marksRow.push(
                    <td key={task.id + ' ' + studentId}>
                        <InputArea key={task.id + ' ' + studentId} 
                            id={task.id + ' ' + studentId} 
                            type="mark" 
                            value={'00'}/>
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


export {generateTaskBody}