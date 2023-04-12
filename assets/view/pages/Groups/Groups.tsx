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



function saveChanges(setIsOnChange: React.Dispatch<React.SetStateAction<boolean>>,
                     setGroup: React.Dispatch<React.SetStateAction<Group>>
    ) {
    // сохранение изменений
    const subj = document.getElementById('subject') as HTMLInputElement;
    const name = document.getElementById('group') as HTMLInputElement;
    setGroup({name: name.value, subject: subj.value});
    setIsOnChange(false);
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
                                onClick={() => props.setIsOnChange(true)}/>
                        </div>

                    </>
                        
                }
                </GroupContext.Consumer>
            }
            {
                props.isOnChange &&
                <GroupContext.Consumer>
                {
                    value => 
                    <>
                        <div className="groups__groupHeader"
                            onKeyDown={(e) => 
                                e.key === 'Enter' ? saveChanges(props.setIsOnChange, value.setGroup) : null
                            }
                        >
                            <InputArea id="group" type="group" value={value.group.name} />
                            <InputArea id="subject" type="subject" value={value.group.subject} />
                        </div>
                        <div className="groups__groupHeader__buttons">
                            <Button type="transparent" iconType="add" data="Добавить ученика" />
                            <Button type="transparent" iconType="minus" data="Удалить ученика"/>
                            <Button type="filled" data="Сохранить" 
                                onClick={() => saveChanges(props.setIsOnChange, value.setGroup)}
                            />
                        </div>
                    </>
                }
                </GroupContext.Consumer>
                
            } 
        </>
    )
}



type Group = {
    name: string,
    subject: string
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
    const a: Group = {
        name: '11 класс',
        subject: 'Физика'
    }
    const [group, setGroup] = useState(a);
    return (
        <GroupContext.Provider value={{group, setGroup}}>
            <div className="groups__wrapper">
                <Header/>
                <Group/>
            </div>
        </GroupContext.Provider>
        
    )
}

export default GroupsPage;