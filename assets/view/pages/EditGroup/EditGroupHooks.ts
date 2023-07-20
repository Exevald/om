import React from "react";
import {GroupFrontData, Student} from "../../../utility/types";
import {
    changeGroupInitials,
    changeStudentName,
    createStudent,
    deleteStudents
} from "../../../api/requests";
import {fetchGetRequest} from "../../../utility/fetchRequest";
import {getGroupDataByIdUrl} from "../../../api/utilities";
import ToastManager from "../../components/ToastManager/ToastManager";


const GroupContext = React.createContext(null);

enum GroupState {
    default,
    edit,
    delete
}


function addStudent(
    groupId: string,
    setStudents: React.Dispatch<React.SetStateAction<Student[]>>
) {
    createStudent(parseInt(groupId, 10))
        .then(() =>
            fetchGetRequest(getGroupDataByIdUrl.replace("GROUP_ID", groupId))
                .then(response => {
                    ToastManager.add('Успешно сохранено', 3000)
                    setStudents(response.studentsIdList)
                })
        )
        .catch(err => ToastManager.add(err + 'ошибка при добавлении студента', 3000))
}


function setStudentById(
    groupId: string,
    students: Array<Student>,
    id: number,
    setActiveStudentId: React.Dispatch<React.SetStateAction<number>>
): boolean {
    let err = false;
    let studentIdForEdit = String(students[id].id)
    const studentLastNameInput = document.getElementById('surname' + id) as HTMLInputElement;
    const studentFirstNameInput = document.getElementById('name' + id) as HTMLInputElement;

    changeStudentName(studentIdForEdit, studentFirstNameInput.value, studentLastNameInput.value)
        .then(() => ToastManager.add('КРАЙНЕ УСПЕШНО сохранено', 3000))
        .catch(() => err = true)
        .finally(() => setActiveStudentId(-1))
    return err
}


function removeStudents(
    groupId: string,
    students: Array<Student>,
    setStudents: React.Dispatch<React.SetStateAction<Student[]>>,
    setState: React.Dispatch<React.SetStateAction<GroupState>>
) {
    let studentsIdsForDelete = [];
    for (let i = 0; i < students.length; i++) {
        const checkbox = document.getElementById('checkbox' + i) as HTMLInputElement;
        if (checkbox.checked) {
            studentsIdsForDelete.push(students[i].id)
        }
    }
    deleteStudents(groupId, studentsIdsForDelete)
        .then(() =>
            fetchGetRequest(getGroupDataByIdUrl.replace("GROUP_ID", groupId))
                .then(response => {
                    ToastManager.add('Успешно сохранено', 3000)
                    setStudents(response.studentsIdList)
                })
        )
        .catch(err => ToastManager.add(err + 'ошибка при удалении студента', 3000))
        .finally(() => setState(GroupState.default))
}


function saveGroupChanges(
    groupId: string,
    setGroup: React.Dispatch<React.SetStateAction<GroupFrontData>>,
    setStudents: React.Dispatch<React.SetStateAction<Student[]>>,
    setState: React.Dispatch<React.SetStateAction<GroupState>>
) {
    const groupNameInput = document.getElementById('group') as HTMLInputElement;
    const groupSubjectInput = document.getElementById('subject') as HTMLInputElement;
    const getUrlApi = getGroupDataByIdUrl.replace("GROUP_ID", groupId)

    changeGroupInitials(groupId, groupNameInput.value, groupSubjectInput.value)
        .then(() =>
            fetchGetRequest(getUrlApi)
                .then(response => {
                    ToastManager.add('Успешно сохранено', 3000)
                    setStudents(response.studentsIdList)
                    setGroup({name: response.groupTitle, subject: response.groupSubject})
                })
        )
        .catch(err => ToastManager.add(err + 'ошибка при сохранении изменений группы', 3000))
        .finally(() => setState(GroupState.default))

}

function saveAllChanges(
    groupId: string,
    setGroup: React.Dispatch<React.SetStateAction<GroupFrontData>>,
    setState: React.Dispatch<React.SetStateAction<GroupState>>,
    students: Array<Student>,
    setStudents: React.Dispatch<React.SetStateAction<Student[]>>,
    activeStudentId: number,
    setActiveStudentId: React.Dispatch<React.SetStateAction<number>>
) {
    let err: boolean = false
    if (activeStudentId !== -1) {
        err = setStudentById(groupId, students, activeStudentId, setActiveStudentId)
    }
    saveGroupChanges(groupId, setGroup, setStudents, setState);
    setTimeout(() => {
        if(err) ToastManager.add(err + 'ошибка при вводе инициалов студента', 3000)
    },50)

}


export {
    GroupContext, GroupState,
    addStudent, setStudentById, removeStudents,
    saveGroupChanges,
    saveAllChanges,
}