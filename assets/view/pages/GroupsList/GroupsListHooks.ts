import React from "react";
import {Group} from "../../../utility/types";
import {changeGroupInitials, createGroup} from "../../../api/requests";
import {deleteGroups} from "../../../api/requests";
import {fetchGetRequest} from '../../../utility/fetchRequest';
import {groupsListUrlApi} from "../../../api/utilities";
import ToastManager from "../../components/ToastManager/ToastManager";


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
    createGroup(teacherId)
        .then(() =>
            fetchGetRequest(groupsListUrlApi)
                .then(response => {
                    setGroups(JSON.parse(response.groups))
                    ToastManager.add('Успешно сохранено', 3000)
                })
        )
        .catch(err => ToastManager.add(err + 'ошибка при создании группы', 3000))
}


function setGroupById(
    setState: React.Dispatch<React.SetStateAction<GroupsListState>>,
    groups: Array<Group>,
    setGroups: React.Dispatch<React.SetStateAction<Group[]>>,
    activeGroupId: number,
    setActiveGroupId: React.Dispatch<React.SetStateAction<number>>
) {
    if (activeGroupId !== -1) {
        const groupForEditId = String(groups[activeGroupId].id)
        const groupNameInput = document.getElementById('group' + activeGroupId) as HTMLInputElement
        const groupSubjectInput = document.getElementById('subject' + activeGroupId) as HTMLInputElement
        changeGroupInitials(groupForEditId, groupNameInput.value, groupSubjectInput.value)
            .then(() =>
                fetchGetRequest(groupsListUrlApi)
                    .then(response => {
                        ToastManager.add('Успешно сохранено', 3000)
                        setGroups(JSON.parse(response.groups)) 
                    })
            )
            .catch(err => ToastManager.add(err + 'ошибка при изменении названия группы', 3000))
            .finally(() => {
                setActiveGroupId(-1);
                setState(GroupsListState.default)
        })
    } else setState(GroupsListState.default)
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
                .then(response => {
                    ToastManager.add('Успешно сохранено', 3000)
                    setGroups(JSON.parse(response.groups)) 
                })
            )
        .catch(err => ToastManager.add(err + 'ошибка при удалении группы',3000))
        .finally(() => setState(GroupsListState.default))
}


export {
    GroupsListContext, GroupsListState,
    addGroup, setGroupById, removeGroups
}