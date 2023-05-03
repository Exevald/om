import React from "react";
import { Group, Student } from "../../../utility/types";
import { DEFAULT_STUDENT_NAME, DEFAULT_STUDENT_SURNAME } from "../../../utility/utilities";


const GroupContext  = React.createContext(null);
const UserContext   = React.createContext(null);
enum GroupState {
    default,
    edit,
    delete
}


function addStudent (
    students: Array<Student>,
    setStudents: React.Dispatch<React.SetStateAction<Student[]>>
    ) {
        let newStudents = students;
        newStudents.push(
            {surname: DEFAULT_STUDENT_SURNAME, name: DEFAULT_STUDENT_NAME}
        )
        setStudents([...newStudents])
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
    newStudents[id] = {surname: studentSurname.value, name: studentName.value};
    setActiveStudentId(-1);
    setStudents(newStudents);
}


function deleteStudents (
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


function saveGroupChanges (
    setState: React.Dispatch<React.SetStateAction<GroupState>>,
    setGroup: React.Dispatch<React.SetStateAction<Group>>
) {
    const subj = document.getElementById('subject') as HTMLInputElement;
    const name = document.getElementById('group') as HTMLInputElement;
    setGroup({name: name.value, subject: subj.value});
    setState(GroupState.default);
}

function saveAllChanges(
    setState: React.Dispatch<React.SetStateAction<GroupState>>,
    students: Array<Student>,
    setStudents: React.Dispatch<React.SetStateAction<Student[]>>,
    setGroup: React.Dispatch<React.SetStateAction<Group>>,
    activeStudentId: number,
    setActiveStudentId: React.Dispatch<React.SetStateAction<number>>
) {
    saveGroupChanges(setState, setGroup);
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