import { changeTaskDate } from "../../../api/requests";
import { Task } from "../../../utility/types";
import ToastManager from "../ToastManager/ToastManager";
import React from "react";
import {fetchGetRequest} from "../../../utility/fetchRequest";
import {marksTableUrlApi} from "../../../api/utilities";


function handleKeyDown(
    event: React.KeyboardEvent,
    id: number,
    groupId: string,
    setIsOnChange: React.Dispatch<React.SetStateAction<boolean>>,
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>
) {
    if (event.key === 'Enter') {
        const rawDate =  (document.getElementById('taskLabel' + id) as HTMLInputElement).value
        changeTaskDate(id.toString(), rawDate)
            .then(() => {
                fetchGetRequest(marksTableUrlApi.replace("GROUP_ID", groupId))
                    .then(response => {
                        setTasks(response.tasks)
                        ToastManager.add('Успешно сохранено', 3000)
                    })
                    .finally(() => setIsOnChange(false))
            }
            )
            .catch(() => {
                setIsOnChange(false)
                ToastManager.add('Введены неправильные данные', 3000)
            })

    }
}


export { handleKeyDown }