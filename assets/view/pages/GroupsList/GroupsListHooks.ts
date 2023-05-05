import React from "react";
import { Group, Student } from "../../../utility/types";
import { DEFAULT_GROUP_NAME, DEFAULT_SUBJECT_NAME } from "../../../utility/utilities";


const GroupsListContext = React.createContext(null);
enum GroupsListState {
    default,
    edit,
    delete
}


function addGroup (
    groups: Array<Group>,
    setGroups: React.Dispatch<React.SetStateAction<Group[]>>
    ) {
        let newGroups = groups;
        newGroups.push(
            {name: DEFAULT_GROUP_NAME, subject: DEFAULT_SUBJECT_NAME}
            )
        setGroups([...newGroups])
}


function setGroupById(
    groups: Array<Group>,
    setGroups: React.Dispatch<React.SetStateAction<Group[]>>,
    id: number,
    setActiveStudentId: React.Dispatch<React.SetStateAction<number>>
    ) {
    let newGroups = groups;
    const groupName = document.getElementById('group' + id) as HTMLInputElement;
    const groupSubject = document.getElementById('subject' + id) as HTMLInputElement;
    newGroups[id] = {name: groupName.value, subject: groupSubject.value};
    setActiveStudentId(-1);
    setGroups(newGroups);
}


function deleteStudents (
    groups: Array<Group>,
    setGroups: React.Dispatch<React.SetStateAction<Group[]>>,
    setState: React.Dispatch<React.SetStateAction<GroupsListState>>
    ) {
        let newGroups = [];
        for (let i = 0; i < groups.length; i++) {
            const checkbox = document.getElementById('checkbox' + i) as HTMLInputElement;
            if (!checkbox.checked) {
                newGroups.push(groups[i])
            }
        }
        setGroups(newGroups);
        setState(GroupsListState.default);
}


function saveAllChanges(
    setState: React.Dispatch<React.SetStateAction<GroupsListState>>,
    groups: Array<Group>,
    setGroups: React.Dispatch<React.SetStateAction<Group[]>>,
    activeGroupId: number,
    setActiveGroupId: React.Dispatch<React.SetStateAction<number>>
) {
    if (activeGroupId !== -1) {
        setGroupById(groups, setGroups, activeGroupId, setActiveGroupId)
    }
}


export { 
    GroupsListContext, GroupsListState, 
    addGroup, setGroupById, deleteStudents, 
    saveAllChanges
}