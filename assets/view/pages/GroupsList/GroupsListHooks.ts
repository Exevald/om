import React from "react";
import {Group, Student} from "../../../utility/types";
import {DEFAULT_GROUP_NAME, DEFAULT_SUBJECT_NAME} from "../../../utility/utilities";
import {groupDataType} from "./getGroupData";
import {createGroup} from "../../../api/requests";
import {getGroupsListPageUrl} from "../../../api/pageUrls";
import {deleteGroups} from "../../../api/requests";

const GroupsListContext = React.createContext(null);

enum GroupsListState {
    default,
    edit,
    delete
}


function addGroup(
    teacherId: number
) {
    const groupData: groupDataType = {
        teacherId: teacherId,
        title: DEFAULT_GROUP_NAME,
        subject: DEFAULT_SUBJECT_NAME,
        studentsList: [],
        tasksList: []
    }
    createGroup(groupData).then(
        () => window.location.href = getGroupsListPageUrl()
    )
}


function setGroupById(
    groups: Array<Group>,
    setGroups: React.Dispatch<React.SetStateAction<Group[]>>,
    id: number,
    setActiveGroupId: React.Dispatch<React.SetStateAction<number>>
) {
    let newGroups = groups
    console.log(groups)
    const groupNameInput = document.getElementById('group' + id) as HTMLInputElement
    const groupSubjectInput = document.getElementById('subject' + id) as HTMLInputElement
    console.log(groupNameInput.value, groupSubjectInput.value)
    // newGroups[id] = {name: groupName.value, subject: groupSubject.value};
    setActiveGroupId(-1)
    setGroups(newGroups)
}


function removeGroups(
    teacherId: string,
    groups: Array<Group>,
    setGroups: React.Dispatch<React.SetStateAction<Group[]>>,
    setState: React.Dispatch<React.SetStateAction<GroupsListState>>
) {
    let groupsForDelete: Array<Group> = [];
    let groupsIds = [];
    for (let i = 0; i < groups.length; i++) {
        const checkbox = document.getElementById('checkbox' + i) as HTMLInputElement;
        if (checkbox.checked) {
            groupsForDelete.push(groups[i])
        }
    }
    let groupIdsForDelete = groupsForDelete.map(group => group.id)
    deleteGroups(groupIdsForDelete, teacherId).then(
        () => window.location.href = getGroupsListPageUrl()
    )
    setState(GroupsListState.default);
}


function saveAllChanges(
    setState: React.Dispatch<React.SetStateAction<GroupsListState>>,
    groups: Array<Group>,
    setGroups: React.Dispatch<React.SetStateAction<Group[]>>,
    activeGroupId: number,
    setActiveGroupId: React.Dispatch<React.SetStateAction<number>>
) {
    // console.log(groups)
    console.log(activeGroupId)
    if (activeGroupId !== -1) {
        setGroupById(groups, setGroups, activeGroupId, setActiveGroupId)
    }
    setState(GroupsListState.default)
}


export {
    GroupsListContext, GroupsListState,
    addGroup, removeGroups,
    saveAllChanges
}