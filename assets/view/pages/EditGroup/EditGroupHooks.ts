import React from "react";
import {GroupFrontData, Student, StudentFrontData} from "../../../utility/types";
import {DEFAULT_STUDENT_NAME, DEFAULT_STUDENT_SURNAME} from "../../../utility/utilities";
import {
    changeGroupName,
    changeStudentName,
    createStudent,
    deleteStudents
} from "../../../api/requests";
import {getEditGroupPageUrl} from "../../../api/pageUrls";
import {fetchGetRequest} from "../../../utility/fetchRequest";
import {getGroupDataByIdUrl} from "../../../api/utilities";


const GroupContext = React.createContext(null);
const UserContext = React.createContext(null);

enum GroupState {
    default,
    edit,
    delete
}


function addStudent(
    groupId: string,
    setStudents: React.Dispatch<React.SetStateAction<Student[]>>
) {
    const studentData: StudentFrontData = {
        groupId: parseInt(groupId, 10),
        firstName: DEFAULT_STUDENT_NAME,
        lastName: DEFAULT_STUDENT_SURNAME
    }
    createStudent(studentData)
        .then(() =>
            fetchGetRequest(getGroupDataByIdUrl.replace("GROUP_ID", groupId))
                .then(response => setStudents(response.studentsIdList))
                .catch(err => console.log(err + ' from adding student'))
        )
}


function setStudentById(
    groupId: string,
    students: Array<Student>,
    setStudents: React.Dispatch<React.SetStateAction<Student[]>>,
    id: number,
    setActiveStudentId: React.Dispatch<React.SetStateAction<number>>
) {
    let studentIdForEdit = String(students[id].id)
    const studentLastNameInput = document.getElementById('surname' + id) as HTMLInputElement;
    const studentFirstNameInput = document.getElementById('name' + id) as HTMLInputElement;

    changeStudentName(studentIdForEdit, studentFirstNameInput.value, studentLastNameInput.value)
        .then(() =>
            fetchGetRequest(getGroupDataByIdUrl.replace("GROUP_ID", groupId))
                .then(response => setStudents(response.studentsIdList))
                .catch(err => console.log(err + ' from setting student initials'))
        )
        .finally(() => setActiveStudentId(-1))
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
                .then(response => setStudents(response.studentsIdList))
                .catch(err => console.log(err + ' from removing students'))
        )
        .finally(() => setState(GroupState.default))
}


function saveGroupChanges(
    groupId: string,
    setGroup: React.Dispatch<React.SetStateAction<GroupFrontData>>,
    setState: React.Dispatch<React.SetStateAction<GroupState>>,
) {
    const groupNameInput = document.getElementById('group') as HTMLInputElement;
    const groupSubjectInput = document.getElementById('subject') as HTMLInputElement;
    const getUrlApi = getGroupDataByIdUrl.replace("GROUP_ID", groupId)

    changeGroupName(groupId, groupNameInput.value, groupSubjectInput.value)
        .then(() =>
            fetchGetRequest(getUrlApi)
                .then(response =>
                    setGroup({name: response.groupTitle, subject: response.groupSubject})
                )
                .catch(err => console.log(err + ' from saving group changes'))
                .finally(() => setState(GroupState.default))
        )

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
    if (activeStudentId !== -1) {
        setStudentById(groupId, students, setStudents, activeStudentId, setActiveStudentId)
    }
    saveGroupChanges(groupId, setGroup, setState);
}


export {
    GroupContext, UserContext, GroupState,
    addStudent, setStudentById, removeStudents,
    saveGroupChanges,
    saveAllChanges
}