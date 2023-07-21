import React, {useContext, useState} from "react";
import "./GroupsList.scss"

import InputArea from "../../components/InputArea/InputArea";
import Button from "../../components/Button/Button";
import Header from "../../components/Header/Header";
import {createRoot} from "react-dom/client";
import {
    GroupsListContext,
    GroupsListState,
    addGroup,
    removeGroups,
    setGroupById
} from "./GroupsListHooks";
import {fetchGetRequest} from "../../../utility/fetchRequest";
import {groupsListUrlApi} from "../../../api/utilities";
import {getEditGroupPageUrl} from "../../../api/pageUrls";
import {getEncryptedText} from "../../../utility/scrambler";
import { Group } from "../../../core/types";


interface GroupsListPageProps {
    teacherId: string,
    userFirstName: string,
    userLastName: string,
    userGroups: any
}

const ButtonList = () => {
    const value = useContext(GroupsListContext);
    return (
        <div className="groups__groupHeader__buttons">
            {
                value.state === GroupsListState.default &&
                    <Button type={"transparent"} iconType="more" data={"Редактировать"}
                            onClick={() => value.setState(GroupsListState.edit)}/>
            }{
                value.state === GroupsListState.edit &&
                <>
                    <Button type={"transparent"} iconType="add" data={"Добавить группу"} onClick={
                        () => addGroup(value.teacherId, value.setGroups)
                    }/>
                    <Button type={"transparent"} iconType="minus" data={"Удалить группу"}
                            onClick={() => value.setState(GroupsListState.delete)}/>
                    <Button type={"filled"} data={"Сохранить"}
                            onClick={() => 
                                setGroupById(
                                    value.setState, value.groups, value.setGroups,
                                    value.activeGroupId, value.setActiveGroupId
                            )}/>
                </>
            }{
                value.state === GroupsListState.delete &&
                <>
                    <Button type={"transparent"} iconType="minus" data={"Удалить"} onClick={
                        () => removeGroups(value.teacherId, value.groups, value.setState, value.setGroups)
                    }/>
                    <Button type={"transparent"} data={"Отмена"}
                            onClick={() => value.setState(GroupsListState.default)}/>
                </>
            }
        </div>
    )
}

interface GroupInputAreaProps {
    groupId: number,
    name: string,
    subject: string
}

const GroupInputArea = (props: GroupInputAreaProps) => {
    return (
        <div className="groups__groupInputArea">
            <InputArea id={'group' + props.groupId} type="group" value={props.name} widthChangeable/>
            <InputArea id={'subject' + props.groupId} type="subject" value={props.subject} widthChangeable/>
        </div>
    )
}

const Groups = () => {
    const context = useContext(GroupsListContext);
    let groups: Array<JSX.Element> = [], checkboxes: Array<JSX.Element> = [];
    if (context.groups.length > 0) {
        for (let i = 0; i < context.groups.length; i++) {

            if (i != context.activeGroupId) {
                groups.push(
                    <li key={'student' + i} className="groups__group"
                        onClick={
                            () => {
                                if (context.state === GroupsListState.default) {
                                    window.location.href = getEditGroupPageUrl()
                                        .replace("GROUP_ID", getEncryptedText(context.groups[i].id))
                                }
                            }
                        }
                        onDoubleClick={
                            context.state === GroupsListState.edit ?
                                () => context.setActiveGroupId(i) : null
                        }>
                        <span>{context.groups[i].title} </span>
                        <span>{context.groups[i].subject}</span>
                    </li>
                )
                checkboxes.push(<InputArea key={'checkbox' + i} id={'checkbox' + i} type="checkbox"/>)
            } else {
                groups.push(
                    <li key={'student' + i} className="groups__group">
                        <GroupInputArea groupId={i} name={context.groups[i].title} subject={context.groups[i].subject}/>
                    </li>
                )
            }

        }
    }
    function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
        if (e.key === 'Enter')
        setGroupById (
            context.setState, context.groups, context.setGroups, 
            context.activeGroupId, context.setActiveGroupId
        )
    }
    return (
        <div className="groups__groupArea" onKeyDown={handleKeyDown}>
            {
                context.state === GroupsListState.delete &&
                <div className="groups__checkboxArea">{checkboxes}</div>
            }
            {
                groups.length > 0 && <ol>{groups}</ol>
            }
        </div>
    )
}

const GroupsListPage = (props: GroupsListPageProps) => {
    const user = {
        shortName: props.userLastName + " " + props.userFirstName[0] + ".",
        imgUrl: ''
    }
    const [state, setState] = useState<GroupsListState>(GroupsListState.default);
    const [groups, setGroups] = useState<Group>(JSON.parse(props.userGroups));
    const [activeGroupId, setActiveGroupId] = useState(-1);
    const teacherId: number = parseInt(props.teacherId, 10)
    return (
        <div className={"groups__wrapper"}>
            <GroupsListContext.Provider value={{
                state, setState,
                groups, setGroups,
                activeGroupId, setActiveGroupId,
                teacherId,
            }}>

                <Header title={"Группы"} userData={user}/>
                <ButtonList/>
                <Groups/>
            </GroupsListContext.Provider>

        </div>

    )
}


function renderGroupsListPage() {
    const root = createRoot(document.getElementById('root'))

    fetchGetRequest(groupsListUrlApi)
        .then(res => {
            root.render(
                <React.StrictMode>
                    <GroupsListPage teacherId={res.teacherId}
                                    userFirstName={res.userFirstName}
                                    userLastName={res.userLastName}
                                    userGroups={res.groups}
                    />
                </React.StrictMode>
            )
        })
}

export {
    renderGroupsListPage
}