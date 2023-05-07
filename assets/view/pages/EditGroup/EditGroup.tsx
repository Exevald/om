import React, {useState} from "react";
import "./EditGroup.scss";


import InputArea from "../../components/InputArea/InputArea";
import Button from "../../components/Button/Button";
import {Group, Student} from "../../../utility/types";
import {addStudent, deleteStudents, saveAllChanges, saveGroupChanges} from "./EditGroupHooks";
import Header from "../../components/Header/Header";
import {createRoot} from "react-dom/client";
import { fetchGetRequest } from "../../../utility/fetchRequest";
import { groupEditUrlApi } from "../../../api/utilities";


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
    return (
        <div className="editGroup__groupHeader__buttons">
            <GroupContext.Consumer>
                {
                    value =>
                        <>{
                            value.state === GroupState.default &&
                            <>
                                <Button type="transparent" iconType="more" data="Изменить" onClick={
                                    () => value.setState(GroupState.edit)}/>
                                {
                                    value.students.length !== 0 ?
                                        <Button type="filled" data="К журналу"/>
                                        :
                                        <Button type="transparentDisabled" data="К журналу"/>
                                }
                            </>
                        }{
                            value.state === GroupState.edit &&
                            <>
                                <Button type="transparent" iconType="add" data="Добавить ученика" onClick={
                                    () => addStudent(value.students, value.setStudents)}/>
                                <Button type="transparent" iconType="minus" data="Удалить ученика" onClick={
                                    () => value.setState(GroupState.delete)}/>
                                <Button type="filled" data="Сохранить" onClick={
                                    () => {
                                        saveAllChanges(value.setState, value.students, value.setStudents, value.setGroup,
                                            value.activeStudentId, value.setActiveStudentId
                                        )
                                    }}/>
                            </>
                        }{
                            value.state === GroupState.delete &&
                            <>
                                <Button type="transparent" iconType="minus" data="Удалить" onClick={
                                    () => deleteStudents(value.students, value.setStudents, value.setState)}/>
                                <Button type="transparent" data="Отмена" onClick={
                                    () => value.setState(GroupState.default)}/>
                            </>
                        }</>
                }
            </GroupContext.Consumer>
        </div>
    )
}


const GroupHeader = () => {
    return (
        <GroupContext.Consumer>
            {
                value =>
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
                            <div className="editGroup__groupHeader" onKeyDown={
                                (e) => e.key === 'Enter' ? saveGroupChanges(value.setState, value.setGroup) : null
                            }>
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
                                <h2 className="editGroup__subject">{value.group.subject} </h2>
                            </div>
                            <ButtonList/>
                        </>
                    }</>
            }
        </GroupContext.Consumer>
    )
}

interface StudentInputAreaProps {
    studentId: number,
    surname: string,
    name: string,
}

const StudentInputArea = (props: StudentInputAreaProps) => {
    return (
        <div className="editGroup__studentInputArea">
            <InputArea id={'surname' + props.studentId} type="studentSurname" value={props.surname} widthChangeable/>
            <InputArea id={'name' + props.studentId} type="studentName" value={props.name} widthChangeable/>
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
                        {props.students[i].surname} {props.students[i].name}
                    </li>
                )
                checkboxes.push(<InputArea key={'checkbox' + i} id={'checkbox' + i} type="checkbox"/>)
            } else {
                students.push(
                    <li key={'student' + i}>
                        <StudentInputArea studentId={i} surname={props.students[i].surname}
                                          name={props.students[i].name}/>
                    </li>
                )
            }
        }
    }
    return (
        <GroupContext.Consumer>
            {
                value =>
                    <div className="editGroup__studentArea" onKeyDown={(e) => e.key === 'Enter' ?
                        saveAllChanges(value.setState, value.students, value.setStudents, value.setGroup,
                            value.activeStudentId, value.setActiveStudentId
                        ) : null
                    }>
                        {
                            props.state === GroupState.delete &&
                            <div className="editGroup__checkboxArea">{checkboxes}</div>
                        }{
                        students.length !== 0 && <ol>{students}</ol>
                    }{
                        students.length === 0 && <h5>Вы ещё не добавили новых учеников</h5>
                    }
                    </div>
            }
        </GroupContext.Consumer>
    )
}

interface GroupProps {
    name: string,
    subject: string
}

const Group = (props: GroupProps) => {
    const [state, setState] = useState<GroupState>(GroupState.default);
    const [group, setGroup] = useState({
        name: props.name,
        subject: props.subject
    });
    const [activeStudentId, setActiveStudentId] = useState(-1);
    const [students, setStudents] = useState([]);
    return (
        <div className="editGroup__group-wrapper">
            <GroupContext.Provider value={{
                group, setGroup,
                students, setStudents,
                state, setState,
                activeStudentId, setActiveStudentId
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
            <Group name={props.group.name} subject={props.group.subject}/>
        </div>

    )
}

function renderEditGroupPage() {
    const root = createRoot(document.getElementById('root'));
    fetchGetRequest(groupEditUrlApi)
    .then(res => 
        root.render(
            <EditGroupPage
                teacherId={res.teacherId}
                userFirstName={res.userFirstName}
                userLastName={res.userLastName}
                group={{id: '0', name: 'Название', subject: 'Предмет'}} />
        )
    )

    
}

export default EditGroupPage;
export {renderEditGroupPage}