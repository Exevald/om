import React from "react";
import './PersonArea.scss'

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

export default PersonArea;
export { PersonAreaProps };