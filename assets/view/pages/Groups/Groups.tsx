import React, { useContext, useState } from "react";
import "./Groups.scss";


import InputArea from "../../components/InputArea/InputArea";
import Button from "../../components/Button/Button";
import { GetData, Group, Student } from "../../../utility/types";
import { addStudent, deleteStudents, saveGroupChanges } from "./GroopHooks";


const GroupContext  = React.createContext(null);
const UserContext   = React.createContext(null);
enum GroupState {
    default,
    edit,
    delete
}

const PersonArea = () => {
    // тут будет в будущем проверка на валидность url фотки 
    return (
        <UserContext.Consumer>
        {
        value =>
            <div className="groups__personArea">
                <p>{value.shortName}</p>
                {
                    value.imgUrl === "" &&
                    <img className="groups__photo"
                        src="./images/Icons/userIcon_default.svg"
                        alt="default user photo"
                    />
                }
                {
                    // Проверка на правильность аватара
                    // isUserAvatarValid &&
                }
            </div>
        }
        </UserContext.Consumer>
    )
}
const Header = () => {
    return (
        <div className="groups__header">
            <h4>Создание группы</h4>
            <PersonArea/>
        </div>
    )
}


const ButtonTuple = () => {
    return (
        <div className="groups__groupHeader__buttons">
            <GroupContext.Consumer>
            {
                value => 
                <>
                {
                    value.state === GroupState.default &&
                    <>
                        <Button type="transparent" iconType="more" data="Изменить" onClick={
                            () => value.setState(GroupState.edit)}/>
                        <Button type="filled" data="К журналу"/>
                    </>
                }
                {
                    value.state === GroupState.edit &&
                    <>
                        <Button type="transparent" iconType="add" data="Добавить ученика" onClick={
                            () => addStudent(value.students, value.setStudents)} />
                        <Button type="transparent" iconType="minus" data="Удалить ученика" onClick={
                            () => value.setState(GroupState.delete)}/>
                        <Button type="filled" data="Сохранить" onClick={
                            () => saveGroupChanges(value.setState, value.setGroup)}/>
                    </>
                }
                {
                    value.state === GroupState.delete &&
                    <>
                        <Button type="transparent" iconType="minus" data="Удалить" onClick={
                            () => deleteStudents(value.students, value.setStudents, value.setState)}/>
                        <Button type="transparent" data="Отмена" onClick={
                            () => value.setState(GroupState.default)}/>
                    </>
                }
                </>
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
                    <ButtonTuple/>
                </>
            }{
                value.state === GroupState.edit &&
                <>
                    <div className="groups__groupHeader" onKeyDown={
                        (e) => e.key === 'Enter' ? saveGroupChanges(value.setState, value.setGroup) : null
                    }>
                        <InputArea id="group" type="group" value={value.group.name} />
                        <InputArea id="subject" type="subject" value={value.group.subject} />
                    </div>
                    <ButtonTuple/>
                </>
            }{
                value.state === GroupState.delete &&
                <>
                    <div className="groups__groupHeader">
                        <h1 className="groups__group">{value.group.name ? value.group.name : 'Название'}</h1>
                        <h2 className="groups__subject">{value.group.subject ? value.group.subject : 'Предмет'} </h2>
                    </div>
                    <ButtonTuple/>
                </>
            }</>
        }
        </GroupContext.Consumer> 
    )
}

interface StudentsProps {
    state: GroupState
    students: Array<Student>
}
const Students = (props: StudentsProps) => {

    let students = [], checkboxes = [];

    if (props.students.length > 0) {
        for(let i = 0; i < props.students.length; i++) {
            students.push(
                <li key={'student' + i} className="groups__student">
                    {props.students[i].surname} {props.students[i].name}
                </li>
            )
            checkboxes.push(<InputArea key={'checkbox' + i} id={'checkbox' + i} type="checkbox"/>)
        }
    }

    return (
        <div className="groups__studentArea">
            {
                props.state === GroupState.delete && 
                <div className="groups__checkboxArea">{checkboxes}</div>
            }
            {
                students.length && <ol>{students}</ol>
            }
            {
                students.length === 0 && <h5>Вы ещё не добавили новых учеников</h5>
            }
        </div>
    )
}

// заглушка для данных по группе
const data: GetData = {
    group: {
        name: '11 класс',
        subject: 'Физика'
    },
    students: [
        {surname: 'Шиханова',   name: 'Дарья'},
        {surname: 'Викторов',   name: 'Роберт'}
    ]
}

const Group = () => {
    const [state, setState] = useState<GroupState>(GroupState.default);
    const [group, setGroup] = useState(data.group);
    const [students, setStudents] = useState(data.students);
    return (
        <div className="groups__group-wrapper">
            <GroupContext.Provider value={{
                group, setGroup, students, setStudents, state, setState
                }}>
                <GroupHeader/>
                <Students state={state} students={students}/>
            </GroupContext.Provider>
        </div>
        
    )
}


// заглушка для пользователя
const user = {
    shortName: 'Рамазанова З.Т.',
    imgUrl: ''
}

const GroupsPage = () => {
    return (
        <div className="groups__wrapper">
            <UserContext.Provider value={user}>
                <Header/>
            </UserContext.Provider>
            <Group/>
        </div>
        
    )
}

export default GroupsPage;