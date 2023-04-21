import React from "react";
import { GetData, Group, Student } from "../../../utility/types";


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
        newStudents.push({surname: 'Фамилия', name: 'Имя'})
        setStudents([...newStudents])
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

export { GroupContext, UserContext, GroupState, addStudent, deleteStudents, saveGroupChanges }