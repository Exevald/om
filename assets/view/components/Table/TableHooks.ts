import React from "react"
import { Task } from "../../../utility/types"
import {changeTaskInitials, changeTaskMaxMark, changeTaskStudentMark, createMark, createTask, deleteTasks} from "../../../api/requests"
import { fetchGetRequest } from "../../../utility/fetchRequest"
import {getGroupDataByIdUrl, marksTableUrlApi} from "../../../api/utilities"
import { TableState } from "../../pages/MarksTable/MarksTable"
import { hasOnlyNumbers } from "../../../utility/hooks"
import ToastManager from "../ToastManager/ToastManager";


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
                .then(response => {
                    setTasks(response.tasks)
                    ToastManager.add('Успешно сохранено', 3000)
                })
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
    const maxMark = document.getElementById('maxMark' + id) as HTMLInputElement
    changeTaskMaxMark(id.toString(), parseInt(maxMark.value))
        .then(() =>
            fetchGetRequest(marksTableUrlApi.replace("GROUP_ID", groupId))
                .then(response => {
                    setTasks(response.tasks)
                    ToastManager.add('Успешно сохранено', 3000)
                    maxMark.blur()
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
        ToastManager.add('ошибка, неправильно введены данные', 2000)
        el.blur()
    } else {
        changeTaskStudentMark(markId, mark)
            .then(() =>
                fetchGetRequest(marksTableUrlApi.replace("GROUP_ID", groupId))
                    .then(response => {
                        setTasks(response.tasks)
                        ToastManager.add('Успешно сохранено', 3000)
                    })
            )
            .catch(() => ToastManager.add('Ошибка при изменении оценки', 3000))
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


function getFinalMarks(): Array<number | string> {
    const tasksTable = document.getElementsByClassName('table__tasks')[0] as HTMLTableElement


    let taskMaxMarks = [], studentMarkSum = 0, delta = 0, maxMarkSum = 0
    let studentFinalMarks = []


    for (let j = 0; j < tasksTable.rows[tasksTable.rows.length - 1].cells.length; j++) {
        let cell = (tasksTable.rows[tasksTable.rows.length - 1].cells[j].firstElementChild as HTMLInputElement).value
        maxMarkSum += parseInt(cell, 10)
        taskMaxMarks[j] = parseInt(cell)
        studentFinalMarks[j] = 0
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
        const final = Math.ceil(studentMarkSum / delta * 100)
        if(isNaN(final)) {
            studentFinalMarks.push("")
        } else {
            studentFinalMarks.push(final)
        }
    }
    return studentFinalMarks
}


export {
    addTask, removeTasks, setTaskInitials, changeTaskMaxMarkHandler,
    addMark, convertMarkToTable, updateMark, getFinalMarks
}
