import React, {useContext, useState} from "react";
import "./GroupsList.scss"

import InputArea from "../../components/InputArea/InputArea";
import Button from "../../components/Button/Button";
import Header from "../../components/Header/Header";
import {createRoot} from "react-dom/client";
import { GroupsListContext, GroupsListState } from "./GroupsListHooks";
import {getEditGroupPageUrl} from "../../../api/pageUrls";


interface GroupsListPageProps {
    teacherId: string,
    userFirstName: string,
    userLastName: string,
    userGroups: any
}
const ButtonList = () => {
    return (
        <div className="groups__groupHeader__buttons">
            <GroupsListContext.Consumer>
                {
                    value => <>{
                        value.state === GroupsListState.default &&
                        <>
                            <Button type={"transparent"} iconType="more" data={"Редактировать"} 
                            onClick={() => value.setState(GroupsListState.edit)}/>
                        </>
                    }{
                        value.state === GroupsListState.edit &&
                        <>
                            <Button type={"transparent"} iconType="add" data={"Добавить группу"} onClick={
                                () => window.location.href = getEditGroupPageUrl().replace("PATH", "create")
                            }/>
                            <Button type={"transparent"} iconType="minus" data={"Удалить группу"} 
                            onClick={() => value.setState(GroupsListState.delete)}/>
                            <Button type={"filled"} data={"Сохранить"}/>
                        </>
                    }{
                        value.state === GroupsListState.delete &&
                        <>
                            <Button type={"transparent"} iconType="minus" data={"Удалить"}/>
                            <Button type={"transparent"} data={"Отмена"}/>
                        </>
                    }</>
                }
            </GroupsListContext.Consumer>
        </div>
    )
}


interface GroupInputAreaProps {
    groupId: number,
    name: string,
    subject: string
}
const GroupInputArea = (props: GroupInputAreaProps) => {
    return(
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
                        onDoubleClick={ 
                            context.state === GroupsListState.edit ?
                                () => context.setActiveGroupId(i) : null
                        }>
                            <span>{context.groups[i].name} </span>
                            <span>{context.groups[i].subject}</span>
                    </li>
                )
                checkboxes.push(<InputArea key={'checkbox' + i} id={'checkbox' + i} type="checkbox"/>)
            } else {
                groups.push(
                    <li key={'student' + i}>
                        <GroupInputArea groupId={i} name={context.groups[i].name} subject={context.groups[i].subject} />
                    </li>
                )
            }

        }
    }
    return (
        <div className="groups__groupArea" onKeyDown={(e) => e.key === 'Enter' && undefined}>
            {
                context.state === GroupsListState.delete &&
                <div className="groups__checkboxArea">{checkboxes}</div>
            }
            {
                groups.length && <ol>{groups}</ol>
            }
            {
                groups.length === 0 && <h5>Вы ещё не добавили ни одной группы</h5>
            }
        </div>
    )
}


// заглушка 
const response = {
    groups: [
        {name: '10-2', subject: 'Физика'},
        {name: '11-1', subject: 'ИКТ'},
        {name: '11-2', subject: 'ОБЖ'}
    ]
}
const GroupsListPage = (props: GroupsListPageProps) => {
    const user = {
        shortName: props.userLastName + " " + props.userFirstName[0] + ".",
        imgUrl: ''
    }
    const [state, setState] = useState<GroupsListState>(GroupsListState.default);
    const [groups, setGroups] = useState(props.userGroups);
    const [activeGroupId, setActiveGroupId] = useState(-1);
    return (
        <div className={"groups__wrapper"}>
            <GroupsListContext.Provider value={{
                state, setState,
                groups, setGroups,
                activeGroupId, setActiveGroupId
            }}>

                <Header title={"Группы"} userData={user}/>
                <ButtonList/>
                <Groups/>
            </GroupsListContext.Provider>

        </div>

    )
}



const renderGroupsListPage = (rootId: string) => {
    const rootElement = document.getElementById(rootId)
    const root = createRoot(rootElement)
    const teacherId = rootElement.dataset.teacherId
    const userFirstName = rootElement.dataset.userFirstName
    const userLastName = rootElement.dataset.userLastName
    const userGroups = rootElement.dataset.groups

    root.render(
        <GroupsListPage teacherId={teacherId}
                        userFirstName={userFirstName}
                        userLastName={userLastName}
                        userGroups={userGroups}
        />
    )
}

export {
    renderGroupsListPage
}