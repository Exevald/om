import React, {useState} from "react";
import "./GroupList.scss"

import InputArea from "../../components/InputArea/InputArea";
import Button from "../../components/Button/Button";
import {Group} from "../../../utility/types";
import Header from "../../components/Header/Header";
import {createRoot} from "react-dom/client";
import {GroupContext, GroupState} from "../EditGroup/EditGroupHooks";

const GroupsContext = React.createContext(null);

enum GroupsListState {
    default,
    edit,
    delete
}

// const user = {
//     shortName: 'Рамазанова З.Т.',
//     imgUrl: ''
// }

interface GroupsListPageProps {
    teacherId: string,
    userFirstName: string,
    userLastName: string,
    userGroups: any
}

const GroupHeader = () => {
    return (
        <GroupContext.Consumer>
            {
                value =>
                <>{
                    value.state === GroupState.default &&
                    <>
                        <div className={"groups__groupHeader"}>

                        </div>
                    </>
                }
                </>
            }
        </GroupContext.Consumer>
    )
}

const GroupsListPage = (props: GroupsListPageProps) => {
    const user = {
        shortName: props.userLastName + " " + props.userFirstName,
        imgUrl: ''
    }
    return (
        <div className={"groups__wrapper"}>
            <Header title={"Группы"} userData={user}/>

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
        <GroupsListPage teacherId={teacherId} userFirstName={userFirstName} userLastName={userLastName} userGroups={userGroups}/>
    )
}

export {renderGroupsListPage}