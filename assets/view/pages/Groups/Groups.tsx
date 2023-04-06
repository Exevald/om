import React from "react";

import "./Groups.scss";


interface Group {
    subject: string,
    class: number
}
interface GroupsData {
    groups: Array<Group>
}
interface PersonAreaProps {
    personName: string,
    personImgUrl: string
}


const PersonArea = (props: PersonAreaProps) => {
    // тут будет в будущем проверка на валидность url фотки 
    return (
        <div className="groups__personArea">
            <p>{props.personName}</p>
            {
                props.personImgUrl === "" &&
                <img className="groups__photo"
                     src="./images/Icons/userIcon_default.svg"
                     alt="default user photo"
                />
            }
            {
                // Проверка на правильность аватара
                //isUserAvatarValid &&
            }
        </div>
    )
}

const Header = () => {
    return (
        <div className="groups__header">
            <h4>Создание группы</h4>
            <PersonArea personName="Рамазанова З.Т." personImgUrl=""/>
        </div>
    )
}

const GroupsPage = () => {
    return (
        <div className="groups__wrapper">
            <Header/>
        </div>
    )
}

export default GroupsPage;