import React, { useContext, useState } from "react";

import InputArea from "../../components/InputArea/InputArea";
import Button from "../../components/Button/Button";
import { GetData, Group, Student } from "../../../utility/types";


import "./Groups.scss";

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



function saveChanges
    (
        setState: React.Dispatch<React.SetStateAction<GroupState>>,
        setGroup: React.Dispatch<React.SetStateAction<Group>>
    ) {
    const subj = document.getElementById('subject') as HTMLInputElement;
    const name = document.getElementById('group') as HTMLInputElement;
    setGroup({name: name.value, subject: subj.value});
    setState(GroupState.default);
}

interface GroupHeaderProps {
    state: GroupState,
    setState: React.Dispatch<React.SetStateAction<GroupState>>
}
const GroupHeader = (props: GroupHeaderProps) => {
    return ( 
        <>
        {
            props.state === GroupState.default &&
            <GroupContext.Consumer>
            {
                value => 
                <>
                    <div className="groups__groupHeader">
                        <h1 className="groups__group">{value.group.name ? value.group.name : 'Название'}</h1>
                        <h2 className="groups__subject">{value.group.subject ? value.group.subject : 'Предмет'} </h2>
                    </div>
                    <div className="groups__groupHeader__buttons">
                        <Button type="transparent" iconType="more" data="Изменить" 
                                onClick={() => props.setState(GroupState.edit)}/>
                    </div>
                </>
            }
            </GroupContext.Consumer>
        }
        {
            props.state === GroupState.edit &&
            <GroupContext.Consumer>
            {
                value => 
                <>
                    <div className="groups__groupHeader" onKeyDown={
                        (e) => e.key === 'Enter' ? saveChanges(props.setState, value.setGroup) : null
                    }>
                        <InputArea id="group" type="group" value={value.group.name} />
                        <InputArea id="subject" type="subject" value={value.group.subject} />
                    </div>
                    <div className="groups__groupHeader__buttons">
                        <Button type="transparent" iconType="add" data="Добавить ученика" />
                        <Button type="transparent" iconType="minus" data="Удалить ученика"
                            onClick={() => props.setState(GroupState.delete)}/>
                        <Button type="filled" data="Сохранить" 
                            onClick={() => saveChanges(props.setState, value.setGroup)}/>
                    </div>
                </>
            }
            </GroupContext.Consumer>
        }
        {
            props.state === GroupState.delete &&
            <h1>delete</h1>
        }
        </>
    )
}

interface StudentsProps {
    students: Array<Student>
}
const Students = (props: StudentsProps) => {

    const students = props.students.map(item => 
        <li key={item.surname.toString() + item.name.toString()}
            className="groups__student">
                {item.surname} {item.name}
        </li>
    )
    return (
        <ol>{students}</ol>
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
        {surname: 'Роберт',     name: 'Викторов'}
    ]
}

const Group = () => {
    const [state, setState] = useState<GroupState>(GroupState.default);
    const [group, setGroup] = useState(data.group);
    const [students, setStudents] = useState(data.students);
    return (
        <div className="groups__group-wrapper">
            <GroupContext.Provider value={{group, setGroup, setStudents}}>
                <GroupHeader state={state} setState={setState}/>
                <Students students={students}/>
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