import React, {useState} from "react";
import "./GroupList.scss"

import InputArea from "../../components/InputArea/InputArea";
import Button from "../../components/Button/Button";
import {Group} from "../../../utility/types";
import Header from "../../components/Header/Header";
import {createRoot} from "react-dom/client";

const GroupsContext = React.createContext(null);

enum GroupsListState {
    default,
    edit,
    delete
}

interface GroupsListPageProps {
    teacherId: string,
    userFirstName: string,
    userLastName: string,
    userGroups: any
}

const ButtonList = () => {
    return (
        <div className={"groups__groupHeader__buttons"}>
            <GroupsContext.Consumer>
                {
                    value => <>{
                        value.state === GroupsListState.default &&
                        <>
                            <Button type={"transparent"} iconType="more" data={"Редактировать"}/>
                        </>
                    }
                    </>
                }
            </GroupsContext.Consumer>
        </div>
    )
}

const GroupHeader = () => {
    return (
        <ButtonList/>
    )
}

const GroupsListPage = (props: GroupsListPageProps) => {
    const user = {
        shortName: props.userLastName + " " + props.userFirstName,
        imgUrl: ''
    }
    const [state, setState] = useState<GroupsListState>(GroupsListState.default);
    console.log(props.userGroups)
    return (
        <div className={"groups__wrapper"}>
            <GroupsContext.Provider value={{
                state, setState
            }}>

                <Header title={"Группы"} userData={user}/>
                <GroupHeader/>
            </GroupsContext.Provider>

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