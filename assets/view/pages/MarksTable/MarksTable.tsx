import React, {useContext, useLayoutEffect, useState} from "react";
import './MarksTable.scss';


import Header from "../../components/Header/Header";
import Table from "../../components/Table/Table";
import Button from "../../components/Button/Button";
import {createRoot} from "react-dom/client";
import {Group} from "../../../utility/types";
import {getDecryptedText, getEncryptedText} from "../../../utility/scrambler";
import {fetchGetRequest} from "../../../utility/fetchRequest";
import {editGroupUrl, getGroupDataByIdUrl, groupEditUrlApi, marksTableUrlApi} from "../../../api/utilities";
import { addTask } from "../../components/Table/TableHooks";
import {sortStudentsByInitials} from "../EditGroup/EditGroupHooks";

const TableGroupContext = React.createContext(null);

enum TableState {
    default,
    edit,
    delete
}


const GroupArea = React.memo(() => {
    const context = useContext(TableGroupContext);
    return (
        <div className="marksTable__groupHeader">
            <h4>{context.groupName}</h4>
            <p onClick={() => 
                window.location.href = editGroupUrl.replace("GROUP_ID", getEncryptedText(context.groupId))
            }>
                Редактировать группу
            </p>
        </div>
    )
})


const ButtonList = () => {
    const context = useContext(TableGroupContext)
    return (
        <div className="marksTable__buttons">
            {
                context.state === TableState.default &&
                <>
                    <Button type="transparent" data="?"/>
                    <Button type="transparent" data="Добавить работу" iconType="add" 
                        onClick={() => addTask(context.groupId, context.setTasks)}/>
                    <Button type="transparent" data="Удалить работу" iconType="minus"
                        onClick={() => context.setState(TableState.delete)}/>
                    <Button type="transparentDisabled" data="Сохранить"/>
                </>
            }{
                context.state === TableState.edit &&
                <>
                    <Button type="transparent" data="?"/>
                    <Button type="transparent" data="Добавить работу" iconType="add" 
                        onClick={() => addTask(context.groupId, context.setTasks)}/>
                    <Button type="transparent" data="Удалить работу" iconType="minus"
                        onClick={() => context.setState(TableState.delete)}/>
                    <Button type="filled" data="Сохранить"/>
                </>
            }{
                context.state === TableState.delete &&
                <>
                    <Button type="transparent" data="Удалить работу" iconType="minus"
                        onClick={() => context.setState(TableState.delete)}/>
                    <Button type="transparent" data="Отмена" onClick={() => context.setState()}/>
                </>
            }
        </div>
    )
}


const TableGroupHeader = () => {
    return (
        <div className="marksTable__header">
            <GroupArea/>
            <ButtonList/>
        </div>
    )
}


interface GroupTableProps {
    group: Group
}
const GroupTable = (props: GroupTableProps) => {
    const [state, setState] = useState<TableState>(TableState.default);
    const [tasks, setTasks] = useState(props.group.tasksList)
    const [students, setStudents] = useState(
        props.group.studentsList.sort((a, b) => sortStudentsByInitials(a, b))
    );
    useLayoutEffect(() =>
        setStudents(
            students.sort((a, b) => sortStudentsByInitials(a, b))
        )
    )
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
                <Table  subject={props.group.subject}
                        students={students}
                        tasks={tasks}
                />
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
    fetchGetRequest(marksTableUrlApi.replace("GROUP_ID", groupId)).then(pageResponse => {
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
                            tasksList: pageResponse.tasks
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