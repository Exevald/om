import React, { useState } from "react";

import "./Groups.scss";
import InputArea from "../../components/InputArea/InputArea";
import Button from "../../components/Button/Button";


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
                // isUserAvatarValid &&
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

const Group = () => {
    const [isOnChange, setIsOnChange] = useState(false);
    return (
        <div className="groups__group-wrapper">
            {
                !isOnChange &&
                <div>
                    <div className="groups__groupHeader">
                        <h1 className="groups__group">Название</h1>
                        <h2 className="groups__subject">Предмет</h2>
                    </div>
                    <Button type="transparent" iconType="more" data="Изменить" onClick={setIsOnChange} />
                </div>
            }
            {
                isOnChange &&
                <div className="groups__groupHeader">
                    <InputArea id="group" type="group" />
                    <InputArea id="subject" type="subject" />
                </div>
            }
        </div>
    )
}

const GroupsPage = () => {
    return (
        <div className="groups__wrapper">
            <Header/>
            <Group/>
        </div>
    )
}

export default GroupsPage;