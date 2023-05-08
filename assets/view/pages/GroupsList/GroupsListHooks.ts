import React from "react";
import {Group, Student} from "../../../utility/types";
import {DEFAULT_GROUP_NAME, DEFAULT_SUBJECT_NAME} from "../../../utility/utilities";
import {groupDataType} from "./getGroupData";
import {changeGroupSubject, changeGroupTitle, createGroup} from "../../../api/requests";
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
    const groupForEditId = String(groups[id].id)
    const groupNameInput = document.getElementById('group' + id) as HTMLInputElement
    const groupSubjectInput = document.getElementById('subject' + id) as HTMLInputElement
    changeGroupTitle(groupForEditId, groupNameInput.value).then(
        () => window.location.href = getGroupsListPageUrl()
    )
    changeGroupSubject(groupForEditId, groupSubjectInput.value).then(
        () => window.location.href = getGroupsListPageUrl()
    )
    setActiveGroupId(-1)
    setGroups(newGroups)
}


function removeGroups(
    teacherId: string,
    groups: Array<Group>,
    setState: React.Dispatch<React.SetStateAction<GroupsListState>>
) {
    let groupsForDelete: Array<Group> = [];
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