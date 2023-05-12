import React, {useContext, useLayoutEffect, useState} from "react";
import "./EditGroup.scss";


import InputArea from "../../components/InputArea/InputArea";
import Button from "../../components/Button/Button";
import {Group, GroupFrontData, Student, Task} from "../../../utility/types";
import {addStudent, removeStudents, saveAllChanges, saveGroupChanges} from "./EditGroupHooks";
import Header from "../../components/Header/Header";
import {createRoot} from "react-dom/client";
import {fetchGetRequest} from "../../../utility/fetchRequest";
import {getGroupDataByIdUrl, groupEditUrlApi} from "../../../api/utilities";
import {getDecryptedText, getEncryptedText} from "../../../utility/scrambler";
import {getGroupsListPageUrl, getMarksTablePageUrl} from "../../../api/pageUrls";

const GroupContext = React.createContext(null);

enum GroupState {
    default,
    edit,
    delete
}


interface EditGroupPageProps {
    teacherId: string,
    userFirstName: string,
    userLastName: string,
    group: Group
}

const ButtonList = () => {
    const value = useContext(GroupContext);
    return (
        <div className="editGroup__groupHeader__buttons">
            {
                value.state === GroupState.default &&
                <>
                    <Button type="filled" data="К группам" onClick={() =>
                        window.location.href = getGroupsListPageUrl()
                    }/>
                    <Button type="transparent" iconType="more" data="Изменить" onClick={
                        () => value.setState(GroupState.edit)}/>
                    {
                        value.students.length !== 0 ?
                            <Button type="filled" data="К журналу" onClick={() =>
                                window.location.href = getMarksTablePageUrl().replace("GROUP_ID", getEncryptedText(value.groupId))
                            }/>
                            :
                            <Button type="transparentDisabled" data="К журналу"/>
                    }
                </>
            }{
            value.state === GroupState.edit &&
            <>
                <Button type="transparent" iconType="add" data="Добавить ученика" onClick={
                    () => addStudent(value.groupId, value.setStudents)}/>
                <Button type="transparent" iconType="minus" data="Удалить ученика" onClick={
                    () => value.setState(GroupState.delete)}/>
                <Button type="filled" data="Сохранить" onClick={
                    () => {
                        saveAllChanges(value.groupId, value.setGroup, value.setState, value.students, value.setStudents,
                            value.activeStudentId, value.setActiveStudentId
                        )
                    }}/>
            </>
        }{
            value.state === GroupState.delete &&
            <>
                <Button type="transparent" iconType="minus" data="Удалить" onClick={
                    () => {
                        removeStudents(value.groupId, value.students, value.setStudents, value.setState)
                    }}/>
                <Button type="transparent" data="Отмена" onClick={
                    () => value.setState(GroupState.default)}/>
            </>
        }
        </div>
    )
}


const GroupHeader = () => {
    const value = useContext(GroupContext);

    function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
        if (e.key === 'Enter')
            saveGroupChanges(value.groupId, value.setGroup, value.setState)
    }

    return (
        <>{
            value.state === GroupState.default &&
            <>
                <div className="editGroup__groupHeader">
                    <h1 className="editGroup__group">{value.group.name}</h1>
                    <h2 className="editGroup__subject">{value.group.subject} </h2>
                </div>
                <ButtonList/>
            </>
        }{
            value.state === GroupState.edit &&
            <>
                <div className="editGroup__groupHeader" onKeyDown={handleKeyDown}>
                    <InputArea id="group" type="group" value={value.group.name} widthChangeable/>
                    <InputArea id="subject" type="subject" value={value.group.subject} widthChangeable/>
                </div>
                <ButtonList/>
            </>
        }{
            value.state === GroupState.delete &&
            <>
                <div className="editGroup__groupHeader">
                    <h1 className="editGroup__group">{value.group.name}</h1>
                    <h2 className="editGroup__subject">{value.group.subject}</h2>
                </div>
                <ButtonList/>
            </>
        }</>
    )
}

interface StudentInputAreaProps {
    studentId: number,
    lastName: string,
    firstName: string,
}

const StudentInputArea = (props: StudentInputAreaProps) => {
    return (
        <div className="editGroup__studentInputArea">
            <InputArea id={'surname' + props.studentId} type="studentSurname" value={props.lastName} widthChangeable/>
            <InputArea id={'name' + props.studentId} type="studentName" value={props.firstName} widthChangeable/>
        </div>
    )
}

interface StudentsProps {
    state: GroupState,
    students: Array<Student>,
    activeStudentId: number,
    setActiveStudentId: React.Dispatch<React.SetStateAction<number>>
}

const Students = (props: StudentsProps) => {
    let students: Array<JSX.Element> = [], checkboxes: Array<JSX.Element> = [];
    if (props.students.length > 0) {
        for (let i = 0; i < props.students.length; i++) {
            if (i != props.activeStudentId) {
                students.push(
                    <li key={'student' + i} className="editGroup__student"
                        onDoubleClick={
                            props.state === GroupState.edit ?
                                () => props.setActiveStudentId(i) :
                                null
                        }>
                        {props.students[i].lastName} {props.students[i].firstName}
                    </li>
                )
                checkboxes.push(<InputArea key={'checkbox' + i} id={'checkbox' + i} type="checkbox"/>)
            } else {
                students.push(
                    <li key={'student' + i}>
                        <StudentInputArea studentId={i} lastName={props.students[i].lastName}
                                          firstName={props.students[i].firstName}/>
                    </li>
                )
            }
        }
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
        if (e.key === 'Enter')
            saveAllChanges(
                value.groupId, value.setGroup, value.setState, value.students, value.setStudents,
                value.activeStudentId, value.setActiveStudentId
            )
    }

    const value = useContext(GroupContext);
    return (
        <div className="editGroup__studentArea" onKeyDown={handleKeyDown}>
            {
                props.state === GroupState.delete &&
                <div className="editGroup__checkboxArea">{checkboxes}</div>
            }{
            students.length !== 0 && <ol>{students}</ol>
        }{
            students.length === 0 && <h5>Вы ещё не добавили новых учеников</h5>
        }
        </div>
    )
}

interface GroupProps {
    id: string,
    name: string,
    subject: string,
    studentsList: Array<Student>,
    tasksIdList: Array<Task>
}

const Group = (props: GroupProps) => {
    const [state, setState] = useState<GroupState>(GroupState.default);
    const [group, setGroup] = useState<GroupFrontData>({
        name: props.name,
        subject: props.subject,
    });
    const [activeStudentId, setActiveStudentId] = useState(-1);
    const [students, setStudents] = useState(
        props.studentsList.sort((a, b) => {
            if (a.lastName > b.lastName) {
                return 1
            } else if (a.firstName > b.firstName && a.lastName === b.lastName) {
                return 1
            } else return -1
        })
    );
    useLayoutEffect(() =>
        setStudents(
            students.sort((a, b) => {
                if (a.lastName > b.lastName) {
                    return 1
                } else if (a.firstName > b.firstName && a.lastName === b.lastName) {
                    return 1
                } else return -1
            })
        )
    )
    const groupId: string = props.id
    return (
        <div className="editGroup__group-wrapper">
            <GroupContext.Provider value={{
                group, setGroup,
                students, setStudents,
                state, setState,
                activeStudentId, setActiveStudentId,
                groupId
            }}>
                <GroupHeader/>
                <Students state={state} students={students}
                          activeStudentId={activeStudentId}
                          setActiveStudentId={setActiveStudentId}/>
            </GroupContext.Provider>
        </div>

    )
}

const EditGroupPage = (props: EditGroupPageProps) => {
    const user = {
        shortName: props.userLastName + " " + props.userFirstName[0] + ".",
        imgUrl: ''
    }
    return (
        <div className="editGroup__wrapper">
            <Header title="Изменение группы" userData={user}/>
            <Group
                id={props.group.id}
                name={props.group.name}
                subject={props.group.subject}
                studentsList={props.group.studentsList}
                tasksIdList={props.group.tasksIdLIst}
            />
        </div>

    )
}

function renderEditGroupPage() {
    const root = createRoot(document.getElementById('root'));
    const loc = location.search
    const groupId = getDecryptedText(loc.replace("?groupId=", ""))
    fetchGetRequest(groupEditUrlApi)
        .then(pageResponse => {
                fetchGetRequest(getGroupDataByIdUrl.replace("GROUP_ID", groupId)).then(groupResponse => {
                    root.render(
                        <React.StrictMode>
                            <EditGroupPage
                                teacherId={pageResponse.teacherId}
                                userFirstName={pageResponse.userFirstName}
                                userLastName={pageResponse.userLastName}
                                group={
                                    {
                                        id: groupId,
                                        name: groupResponse.groupTitle,
                                        subject: groupResponse.groupSubject,
                                        studentsList: groupResponse.studentsIdList,
                                        tasksIdLIst: groupResponse.tasksIdList
                                    }
                                }
                            />
                        </React.StrictMode>
                    )
                })
            }
        )


}

export {renderEditGroupPage}