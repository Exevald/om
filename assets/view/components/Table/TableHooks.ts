import React from "react"
import { Task } from "../../../utility/types"
import {changeTaskInitials, changeTaskMaxMark, changeTaskStudentMark, createMark, createTask, deleteTasks} from "../../../api/requests"
import { fetchGetRequest } from "../../../utility/fetchRequest"
import {getGroupDataByIdUrl, marksTableUrlApi} from "../../../api/utilities"
import { TableState } from "../../pages/MarksTable/MarksTable"
import { hasOnlyNumbers } from "../../../utility/hooks"
import { showToast } from "../Toast/Toast"


function addTask(
    groupId: string,
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>
) {
    createTask(groupId)
        .then(() => 
            fetchGetRequest(marksTableUrlApi.replace("GROUP_ID", groupId))
                .then(response => setTasks(response.tasks))
        )
        .catch(err => console.log(err))
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
            )
        .catch(err => console.log(err + ' from removing tasks'))
        .finally(() => setState(TableState.default))
}


function setTaskInitials(
    taskId: number,
    groupId: string,
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>,
    setIsInitialsOnChange: React.Dispatch<React.SetStateAction<boolean>>
) {
    const topic = document.getElementById('topic' + taskId) as HTMLInputElement
    const description = document.getElementById('description' + taskId) as HTMLInputElement
    changeTaskInitials(taskId, topic.value, description.value)
        .then(() =>
            fetchGetRequest(marksTableUrlApi.replace("GROUP_ID", groupId))
                .then(response => setTasks(response.tasks))
        )
        .catch(err => console.log(err + ' from setting task initials'))
        .finally(() => {
            setIsInitialsOnChange(false)
        })
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
                .then(response => {
                    setTasks(response.tasks)
                    document.getElementById('maxMark' + id).blur()
                })
        )
        .catch(err => console.log(`${err} from updating max mark of ${id} task`))
}


function addMark(
    taskId: number,
    studentId: number,
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>,
    groupId: string
) {
    const el = document.getElementById(taskId + ' ' + studentId) as HTMLInputElement
    let mark: number
    switch (el.value) {
        case 'Н':
            mark = -1
            break
        case 'Н0':
            mark = -2
            break
        default:
            if(hasOnlyNumbers(el.value)) {
                mark = convertMarkToDatabase(el.value)
            }
    }
    if (mark === undefined) {
        // тост об ошибке
        console.log('ошибка, неправильно введены данные')
        el.blur()
    } else {
        createMark(taskId, studentId, mark)
            .then(() =>
                fetchGetRequest(marksTableUrlApi.replace("GROUP_ID", groupId))
                    .then(response => setTasks(response.tasks))
            )
            .catch(err => console.log(err + ' from adding new mark'))
            .finally(() => el.blur())
    }
}


function updateMark(
    markId: number,
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>,
    groupId: string
) {
    const el = document.getElementById('mark' + markId) as HTMLInputElement
    let mark: number
    switch (el.value) {
        case 'Н':
            mark = -1
            break
        case 'Н0':
            mark = -2
            break
        default:
            if(hasOnlyNumbers(el.value)) {
                mark = convertMarkToDatabase(el.value)
            }
    }
    if (mark === undefined) {
        // тост об ошибке
        console.log('ошибка, неправильно введены данные')
        el.blur()
    } else {
        changeTaskStudentMark(markId, mark)
            .then(() =>
                fetchGetRequest(marksTableUrlApi.replace("GROUP_ID", groupId))
                    .then(response => {
                        setTasks(response.tasks)
                        showToast('Успешно сохранено', 3000)
                    })
            )
            .catch(err => console.log(err + ' from adding new mark'))
            .finally(() => el.blur())
    }
}



function convertMarkToTable(mark: number): string {
    switch (mark) {
        case -2:
            return 'Н0'
        case -1:
            return 'Н'
        default:
            return mark.toString()
    }
}

function convertMarkToDatabase(mark: string): number {
    switch (mark) {
        case 'Н0':
            return -2
        case 'Н':
            return -1
        default:
            return parseInt(mark, 10)
    }
}


export {
    addTask, removeTasks, setTaskInitials, changeTaskMaxMarkHandler,
    addMark, convertMarkToTable, updateMark
}
