import React, {useContext, useState} from "react";
import "./EditGroup.scss";


import InputArea from "../../components/InputArea/InputArea";
import Button from "../../components/Button/Button";
import {Group, Student} from "../../../utility/types";
import {addStudent, deleteStudents, saveAllChanges, saveGroupChanges} from "./EditGroupHooks";
import Header from "../../components/Header/Header";


const GroupContext = React.createContext(null);

enum GroupState {
    default,
    edit,
    delete
}


const ButtonList = () => {
    return (
        <div className="groups__groupHeader__buttons">
            <GroupContext.Consumer>
                {
                    value =>
                        <>{
                            value.state === GroupState.default &&
                            <>
                                <Button type="transparent" iconType="more" data="Изменить" onClick={
                                    () => value.setState(GroupState.edit)}/>
                                <Button type="filled" data="К журналу"/>
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
                            <div className="groups__groupHeader">
                                <h1 className="groups__group">{value.group.name ? value.group.name : 'Название'}</h1>
                                <h2 className="groups__subject">{value.group.subject ? value.group.subject : 'Предмет'} </h2>
                            </div>
                            <ButtonList/>
                        </>
                    }{
                        value.state === GroupState.edit &&
                        <>
                            <div className="groups__groupHeader" onKeyDown={
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
                            <div className="groups__groupHeader">
                                <h1 className="groups__group">{value.group.name ? value.group.name : 'Название'}</h1>
                                <h2 className="groups__subject">{value.group.subject ? value.group.subject : 'Предмет'} </h2>
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
        <div className="groups__studentInputArea">
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
                    <li key={'student' + i} className="groups__student"
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
                    <div className="groups__studentArea" onKeyDown={(e) => e.key === 'Enter' ?
                        saveAllChanges(value.setState, value.students, value.setStudents, value.setGroup,
                            value.activeStudentId, value.setActiveStudentId
                        ) : null
                    }>
                        {
                            props.state === GroupState.delete &&
                            <div className="groups__checkboxArea">{checkboxes}</div>
                        }{
                        students.length && <ol>{students}</ol>
                    }{
                        students.length === 0 && <h5>Вы ещё не добавили новых учеников</h5>
                    }
                    </div>
            }
        </GroupContext.Consumer>
    )
}

// заглушка для данных по группе
const data = {
    group: {
        name: '11 класс',
        subject: 'Физика'
    },
    students: [
        {surname: 'Шиханова', name: 'Дарья'},
        {surname: 'Викторов', name: 'Роберт'},
        {surname: 'Баянова', name: 'Наталия'},
        {surname: 'Грустный', name: 'Павел'},
        {surname: 'Зелепупкович', name: 'Афанасий'},
        {surname: 'Апполинарьев', name: 'Владлен'},
    ]
}

const Group = () => {
    const [state, setState] = useState<GroupState>(GroupState.default);
    const [group, setGroup] = useState(data.group);
    const [activeStudentId, setActiveStudentId] = useState(-1); // id, при котором ни один не будет активным
    const [students, setStudents] = useState(data.students);
    return (
        <div className="groups__group-wrapper">
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

// заглушка для пользователя
const user = {
    shortName: 'Рамазанова З.Т.',
    imgUrl: ''
}

const EditGroupPage = () => {
    return (
        <div className="groups__wrapper">
            <Header title="Создание группы" userData={user}/>
            <Group/>
        </div>

    )
}

export default EditGroupPage;