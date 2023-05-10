import React from "react";
import {Group, Student} from "../../../utility/types";
import {DEFAULT_GROUP_NAME, DEFAULT_SUBJECT_NAME} from "../../../utility/utilities";
import {groupDataType} from "./getGroupData";
import {changeGroupSubject, changeGroupTitle, createGroup} from "../../../api/requests";
import {getGroupsListPageUrl} from "../../../api/pageUrls";
import {deleteGroups} from "../../../api/requests";
import {fetchGetRequest} from '../../../utility/fetchRequest';
import {groupsListUrlApi} from "../../../api/utilities";


const GroupsListContext = React.createContext(null);

enum GroupsListState {
    default,
    edit,
    delete
}


function addGroup(
    teacherId: number,
    setGroups: React.Dispatch<React.SetStateAction<Group[]>>
) {
    const groupData: groupDataType = {
        teacherId: teacherId,
        title: DEFAULT_GROUP_NAME,
        subject: DEFAULT_SUBJECT_NAME,
        studentsList: [],
        tasksList: []
    }
    createGroup(groupData)
        .then(() => 
            fetchGetRequest(groupsListUrlApi)
                .then(response => setGroups(JSON.parse(response.groups)))
                .catch(err => console.log(err + ' from adding new group'))
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
    changeGroupTitle(groupForEditId, groupNameInput.value)
        .then(() => 
            fetchGetRequest(groupsListUrlApi)
                .then(response => setGroups(JSON.parse(response.groups)))
                .catch(err => console.log(err + ' from changing group title'))
        )
    changeGroupSubject(groupForEditId, groupSubjectInput.value)
        .then(() => 
            fetchGetRequest(groupsListUrlApi)
                .then(response => setGroups(JSON.parse(response.groups)))
                .catch(err => console.log(err + ' from changing group subject'))
    )
    setActiveGroupId(-1)
    setGroups(newGroups)
}


function removeGroups(
    teacherId: string,
    groups: Array<Group>,
    setState: React.Dispatch<React.SetStateAction<GroupsListState>>,
    setGroups: React.Dispatch<React.SetStateAction<Group[]>>
) {
    let groupsIdsForDelete: Array<string> = [];
    for (let i = 0; i < groups.length; i++) {
        const checkbox = document.getElementById('checkbox' + i) as HTMLInputElement;
        if (checkbox.checked) {
            groupsIdsForDelete.push(groups[i].id)
        }
    }
    deleteGroups(groupsIdsForDelete, teacherId)
        .then(() => 
            fetchGetRequest(groupsListUrlApi)
                .then(response => setGroups(JSON.parse(response.groups)))
                .catch(err => console.log(err + ' from deleting groups'))   
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