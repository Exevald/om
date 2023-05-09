import React from "react";
import {Group, Student} from "../../../utility/types";
import {DEFAULT_STUDENT_NAME, DEFAULT_STUDENT_SURNAME} from "../../../utility/utilities";
import {changeGroupSubject, changeGroupTitle, createStudent} from "../../../api/requests";
import {getEditGroupPageUrl} from "../../../api/pageUrls";
import {getEncryptedText} from "../../../utility/scrambler";
import {studentDataType} from "./getStudentData";


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
    students: Array<Student>,
    setStudents: React.Dispatch<React.SetStateAction<Student[]>>,
    id: number,
    setActiveStudentId: React.Dispatch<React.SetStateAction<number>>
) {
    let newStudents = students;
    const studentSurname = document.getElementById('surname' + id) as HTMLInputElement;
    const studentName = document.getElementById('name' + id) as HTMLInputElement;
    newStudents[id] = {lastName: studentSurname.value, firstName: studentName.value};
    setActiveStudentId(-1);
    setStudents(newStudents);
}


function deleteStudents(
    students: Array<Student>,
    setStudents: React.Dispatch<React.SetStateAction<Student[]>>,
    setState: React.Dispatch<React.SetStateAction<GroupState>>
) {
    let newStudents = [];
    for (let i = 0; i < students.length; i++) {
        const checkbox = document.getElementById('checkbox' + i) as HTMLInputElement;
        if (!checkbox.checked) {
            newStudents.push(students[i])
        }
    }
    setStudents(newStudents);
    setState(GroupState.default);
}


function saveGroupChanges(
    groupId: string,
    setState: React.Dispatch<React.SetStateAction<GroupState>>,
) {
    const groupNameInput = document.getElementById('group') as HTMLInputElement;
    const groupSubjectInput = document.getElementById('subject') as HTMLInputElement;
    changeGroupTitle(groupId, groupNameInput.value).then(
        () => window.location.href = getEditGroupPageUrl().replace("GROUP_ID", getEncryptedText(groupId))
    )
    changeGroupSubject(groupId, groupSubjectInput.value).then(
        () => window.location.href = getEditGroupPageUrl().replace("GROUP_ID", getEncryptedText(groupId))
    )
    setState(GroupState.default);
}

function saveAllChanges(
    groupId: string,
    setState: React.Dispatch<React.SetStateAction<GroupState>>,
    students: Array<Student>,
    setStudents: React.Dispatch<React.SetStateAction<Student[]>>,
    activeStudentId: number,
    setActiveStudentId: React.Dispatch<React.SetStateAction<number>>
) {
    saveGroupChanges(groupId, setState);
    if (activeStudentId !== -1) {
        setStudentById(students, setStudents, activeStudentId, setActiveStudentId)
    }
}


export {
    GroupContext, UserContext, GroupState,
    addStudent, setStudentById, deleteStudents,
    saveGroupChanges,
    saveAllChanges
}