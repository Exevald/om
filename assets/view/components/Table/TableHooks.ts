import React, { useContext } from "react"
import { Task } from "../../../utility/types"
import { changeTaskMaxMark, createTask, deleteTasks } from "../../../api/requests"
import { fetchGetRequest } from "../../../utility/fetchRequest"
import { marksTableUrlApi } from "../../../api/utilities"
import { TableState } from "../../pages/MarksTable/MarksTable"


function addTask(
    groupId: string,
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>
) {
    createTask(groupId)
        .then(() => 
            fetchGetRequest(marksTableUrlApi.replace("GROUP_ID", groupId))
                .then(response => setTasks(response.tasks))
                .catch(err => console.log(err))
        )
}


function removeTasks(
    groupId: string,
    tasks: Array<Task>,
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>,
    setState: React.Dispatch<React.SetStateAction<TableState>>
) {
    let tasksIdsForDelete: Array<number> = [];

    tasks.forEach(task => {
        const checkbox = document.getElementById('checkbox' + task.id) as HTMLInputElement;
        if (checkbox.checked) {
            tasksIdsForDelete.push(task.id)
        }
    })

    deleteTasks(groupId, tasksIdsForDelete)
        .then(() =>
            fetchGetRequest(marksTableUrlApi.replace("GROUP_ID", groupId))
                .then(response => setTasks(response.tasks))
                .catch(err => console.log(err + ' from removing tasks'))
        )
        .finally(() => setState(TableState.default))
}


function changeTaskMaxMarkHandler(
    id: number,
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>,
    groupId: string
) {
    const maxMark = (document.getElementById('maxMark' + id) as HTMLInputElement).value
    changeTaskMaxMark(id.toString(), parseInt(maxMark))
        .then(() =>
            fetchGetRequest(marksTableUrlApi.replace("GROUP_ID", groupId))
                .then(response => setTasks(response.tasks))
                .catch(err => console.log(`${err} from updating max mark of ${id} task`))
        )
}


export {
    addTask, removeTasks,
    changeTaskMaxMarkHandler
}
