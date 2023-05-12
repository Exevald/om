import React from "react"
import { Task } from "../../../utility/types"
import { createTask } from "../../../api/requests"
import { fetchGetRequest } from "../../../utility/fetchRequest"
import { getGroupDataByIdUrl } from "../../../api/utilities"


function addTask(
    groupId: string,
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>
) {
    createTask(groupId)
        .then(() => 
            fetchGetRequest(getGroupDataByIdUrl.replace("GROUP_ID", groupId))
                .then(response => setTasks(response.tasksList))
                .catch(err => console.log(err))
        )
}


export {
    addTask 
}
