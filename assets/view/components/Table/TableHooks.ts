import React from "react"
import {Student, Task} from "../../../utility/types"
import { createTask } from "../../../api/requests"
import { fetchGetRequest } from "../../../utility/fetchRequest"
import { marksTableUrlApi } from "../../../api/utilities"


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

function sortStudentsByInitials(a: Student, b: Student): number {
    if (a.lastName > b.lastName) {
        return 1
    } else if (a.firstName > b.firstName && a.lastName === b.lastName) {
        return 1
    } else return -1
}


export {
    addTask, sortStudentsByInitials
}
