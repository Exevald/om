import React, {useContext, useState} from "react";
import './MarksTable.scss';


import Header from "../../components/Header/Header";
import Table from "../../components/Table/Table";
import Button from "../../components/Button/Button";
import {createRoot} from "react-dom/client";
import {Group} from "../../../utility/types";
import {getDecryptedText, getEncryptedText} from "../../../utility/scrambler";
import {fetchGetRequest} from "../../../utility/fetchRequest";
import {editGroupUrl, getGroupDataByIdUrl, groupEditUrlApi} from "../../../api/utilities";

const TableGroupContext = React.createContext(null);

enum TableState {
    default,
    edit,
    delete
}


interface GroupAreaProps {
    groupName: string,
    setState: React.Dispatch<React.SetStateAction<TableState>>
}

const GroupArea = (props: GroupAreaProps) => {
    return (
        <div className="marksTable__groupHeader">
            <h4>{props.groupName}</h4>
            <p onClick={() => props.setState(TableState.edit)}>
                Редактировать страницу
            </p>
        </div>
    )
}


const ButtonList = () => {
    const context = useContext(TableGroupContext)
    return (
        <div className="marksTable__buttons">
            {
                context.state === TableState.default &&
                <>
                    <Button type="transparent" data="?"/>
                    <Button type="transparent" data="Добавить работу" iconType="add"/>
                    <Button type="transparent" data="Удалить работу" iconType="minus"/>
                    <Button type="transparentDisabled" data="Сохранить"/>
                    <Button type="filled" data="К группе" onClick={() =>
                        window.location.href = editGroupUrl.replace("GROUP_ID", getEncryptedText(context.groupId))
                    }/>
                </>
            }{

        }
        </div>
    )
}


const TableGroupHeader = () => {
    const context = useContext(TableGroupContext);
    return (
        <div className="marksTable__header">
            <GroupArea groupName={context.groupName} setState={context.setState}/>
            <ButtonList/>
        </div>
    )
}


interface GroupTableProps {
    group: Group
}
const GroupTable = (props: GroupTableProps) => {
    const [state, setState] = useState<TableState>(TableState.default);
    const [tasks, setTasks] = useState(props.group.tasksIdLIst)
    const groupId = props.group.id;
    const groupName = props.group.name;
    return (
        <>
            <TableGroupContext.Provider
                value={{
                    groupId, groupName,
                    state, setState,
                    tasks, setTasks
            }}>
                <TableGroupHeader/>
                <Table group={props.group} setState={setState} setTasks={setTasks} />
            </TableGroupContext.Provider>
        </>
    )
}

interface MarksTableProps {
    teacherId: string,
    userFirstName: string,
    userLastName: string,
    group: Group
}

const MarksTable = (props: MarksTableProps) => {
    const user = {
        shortName: props.userLastName + " " + props.userFirstName[0] + ".",
        imgUrl: ''
    }
    return (
        <div className="marksTable__wrapper">
            <Header title="Журнал" userData={user}/>
            <GroupTable group={props.group}/>
        </div>
    )
}

const renderMarksTable = () => {
    const root = createRoot(document.getElementById('root'))
    const loc = location.search
    const groupId = getDecryptedText(loc.replace("?groupId=", ""))
    fetchGetRequest(groupEditUrlApi).then(pageResponse => {
        fetchGetRequest(getGroupDataByIdUrl.replace("GROUP_ID", groupId)).then(groupResponse => {
            root.render(
                <React.StrictMode>
                    <MarksTable teacherId={pageResponse.teacherId} 
                        userFirstName={pageResponse.userFirstName} 
                        userLastName={pageResponse.userLastName} 
                        group={{
                            id: groupId,
                            name: groupResponse.groupTitle,
                            subject: groupResponse.groupSubject,
                            studentsList: groupResponse.studentsIdList,
                            tasksIdLIst: groupResponse.tasksIdList
                    }}/>
                </React.StrictMode>
            )
        })
    })
}

export { 
    TableState, TableGroupContext, 
    renderMarksTable
}