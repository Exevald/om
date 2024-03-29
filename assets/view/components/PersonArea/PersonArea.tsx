import React from "react";
import './PersonArea.scss'

// @ts-ignore
import userDefaultIcon from "./userIcon_default.svg"


interface PersonAreaProps {
    shortName: string,
    imgUrl: string
}
const PersonArea = (props: PersonAreaProps) => {
    // тут будет в будущем проверка на валидность url фотки 
    return (
        
            <div className="personArea__wrapper">
                <p>{props.shortName}</p>
                {
                    props.imgUrl === "" &&
                    <img className="personArea__photo"
                        src={userDefaultIcon}
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

export default PersonArea;
export { PersonAreaProps };