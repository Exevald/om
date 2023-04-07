import React, { useContext, useState } from "react";

import "./Groups.scss";
import InputArea from "../../components/InputArea/InputArea";
import Button from "../../components/Button/Button";



const GroupContext = React.createContext(null);



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



function saveChanges(setIsOnChange: React.Dispatch<React.SetStateAction<boolean>>) {
    // сохранение изменений
}

interface GroupHeaderProps {
    isOnChange: boolean,
    setIsOnChange: React.Dispatch<React.SetStateAction<boolean>>
}
const GroupHeader = (props: GroupHeaderProps) => {
    return ( 
        <>
            {
                !props.isOnChange &&
                <div>
                    <div className="groups__groupHeader">
                        <GroupContext.Consumer>
                            {
                                value => 
                                <>
                                    <h1 className="groups__group">{value.name ? value.name : 'Название'}</h1>
                                    <h2 className="groups__subject">{value.subject ? value.subject : 'Предмет'} </h2>
                                </>
                            }
                        </GroupContext.Consumer>
                        
                    </div>
                    <Button type="transparent" iconType="more" data="Изменить" onClick={() => props.setIsOnChange(true)}/>
                </div>
            }
            {
                props.isOnChange &&
                <div>
                    <div className="groups__groupHeader">
                        <InputArea id="group" type="group" />
                        <InputArea id="subject" type="subject" />
                    </div>
                    <div className="groups__groupHeader__buttons">
                        <Button type="transparent" iconType="add" data="Добавить ученика" />
                        <Button type="transparent" iconType="minus" data="Удалить ученика"/>
                        <Button type="filled" data="Сохранить" onClick={() => props.setIsOnChange(false)}/>
                    </div>
                </div>
            } 
        </>
    )
}



interface Group {
    subject: string,
    class: number
}
interface GroupsData {
    groups: Array<Group>
}
const Group = () => {
    

    const [isOnChange, setIsOnChange] = useState(false);
    return (
        <div className="groups__group-wrapper">
            <GroupHeader isOnChange={isOnChange} setIsOnChange={setIsOnChange}/>
        </div>
        
    )
}

const GroupsPage = () => {
    const group = {
        name: '11 класс',
        subject: 'Физика'
    };
    return (
        <GroupContext.Provider value={group}>
            <div className="groups__wrapper">
                <Header/>
                <Group/>
            </div>
        </GroupContext.Provider>
        
    )
}

export default GroupsPage;