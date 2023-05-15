import React, { useContext } from "react"
import { Task } from "../../../utility/types"
import { changeTaskMaxMark, createTask } from "../../../api/requests"
import { fetchGetRequest } from "../../../utility/fetchRequest"
import { marksTableUrlApi } from "../../../api/utilities"
import { TableGroupContext } from "../../pages/MarksTable/MarksTable"


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


function deleteTasks(
    
) {

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
    addTask,
    changeTaskMaxMarkHandler
}
