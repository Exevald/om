import React from "react";
import {Group, GroupFrontData, Student} from "../../../utility/types";
import {DEFAULT_STUDENT_NAME, DEFAULT_STUDENT_SURNAME} from "../../../utility/utilities";
import {
    changeGroupSubject,
    changeGroupTitle,
    changeStudentName,
    createStudent,
    deleteStudents
} from "../../../api/requests";
import {getEditGroupPageUrl} from "../../../api/pageUrls";
import {getEncryptedText} from "../../../utility/scrambler";
import {studentDataType} from "./getStudentData";
import { fetchGetRequest } from "../../../utility/fetchRequest";
import {changeGroupSubjectUrl, getGroupDataByIdUrl} from "../../../api/utilities";


const GroupContext = React.createContext(null);
const UserContext = React.createContext(null);

enum GroupState {
    default,
    edit,
    delete
}


function addStudent(
    groupId: string
) {
    const studentData: studentDataType = {
        groupId: parseInt(groupId, 10),
        firstName: DEFAULT_STUDENT_NAME,
        lastName: DEFAULT_STUDENT_SURNAME
    }
    createStudent(studentData).then(
        () => window.location.href = getEditGroupPageUrl().replace("GROUP_ID", getEncryptedText(groupId))
    )
}


function setStudentById(
    groupId: string,
    students: Array<Student>,
    setStudents: React.Dispatch<React.SetStateAction<Student[]>>,
    id: number,
    setActiveStudentId: React.Dispatch<React.SetStateAction<number>>
) {
    let newStudents = students;
    let studentIdForEdit = String(students[id].id)
    const studentLastNameInput = document.getElementById('surname' + id) as HTMLInputElement;
    const studentFirstNameInput = document.getElementById('name' + id) as HTMLInputElement;
    changeStudentName(studentIdForEdit, studentFirstNameInput.value, studentLastNameInput.value).then(
        () => window.location.href = getEditGroupPageUrl().replace("GROUP_ID", getEncryptedText(groupId))
    )
    setActiveStudentId(-1);
    setStudents(newStudents);
}


function removeStudents(
    groupId: string,
    students: Array<Student>,
    setState: React.Dispatch<React.SetStateAction<GroupState>>
) {
    let studentsForDelete: Array<Student> = [];
    for (let i = 0; i < students.length; i++) {
        const checkbox = document.getElementById('checkbox' + i) as HTMLInputElement;
        if (checkbox.checked) {
            studentsForDelete.push(students[i])
        }
    }
    let studentsIdsForDelete = studentsForDelete.map(student => student.id)
    deleteStudents(groupId, studentsIdsForDelete).then(
        () => window.location.href = getEditGroupPageUrl().replace("GROUP_ID", getEncryptedText(groupId))
    )
    setState(GroupState.default);
}


function saveGroupChanges(
    groupId: string,
    setGroup: React.Dispatch<React.SetStateAction<GroupFrontData>>,
    setState: React.Dispatch<React.SetStateAction<GroupState>>,
) {
    const groupNameInput = document.getElementById('group') as HTMLInputElement;
    const groupSubjectInput = document.getElementById('subject') as HTMLInputElement;

    changeGroupTitle(groupId, groupNameInput.value)
        .then(() => 
            fetchGetRequest(getGroupDataByIdUrl.replace("GROUP_ID", groupId))
                .then(response => 
                    setGroup({name: response.groupTitle, subject: response.groupSubject})
                )
                .catch(err => console.log(err +' from saving group changes'))
        )
    changeGroupSubject(groupId, groupSubjectInput.value)
        .then(() => 
            fetchGetRequest(getGroupDataByIdUrl.replace("GROUP_ID", groupId))
                .then(response => 
                    setGroup({name: response.groupTitle, subject: response.groupSubject})
                )
                .catch(err => console.log(err +' from saving subject changes'))
            )
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
    saveGroupChanges(groupId, setGroup, setState);
    if (activeStudentId !== -1) {
        setStudentById(groupId, students, setStudents, activeStudentId, setActiveStudentId)
    }
}


export {
    GroupContext, UserContext, GroupState,
    addStudent, setStudentById, removeStudents,
    saveGroupChanges,
    saveAllChanges
}