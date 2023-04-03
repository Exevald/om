import React, { useState } from "react";

import './Onboarding.scss'


const FirstImage = () => {
    return (
        <img className="intro__images"
            src="./images/FirstAbstract.svg"
            alt="Векторная абстракция"
        />
    )
}
const SecondImage = () => {
    return (
        <img className="intro__images"
            src="./images/SecondAbstract.svg"
            alt="Векторная абстракция"
        />
    )
}

interface arrowProps {
    onClick: React.MouseEventHandler<HTMLImageElement>
}
const NextArrow = (props: arrowProps) => {
    return (
        <img className="intro__arrows"
            src="./images/Icons/navigate_next.svg"
            alt="Стрелка вправо"
            onClick={props.onClick}
        />
    )
}
const PrevArrow = (props: arrowProps) => {
    return (
        <img className="intro__arrows"
            src="./images/Icons/navigate_previous.svg"
            alt="Стрелка влево"
            onClick={props.onClick}
        />
    )
}
const Plug = () => {
    return (
        <div className="intro__arrows"></div>
    )
}
const Onboarding = () => {
    const [step, setStep] = useState(1);
    return (
        <div className="intro__wrapper">
            {
                step === 1 &&
                <>
                    <FirstImage/>
                    <h1>Создавайте группы</h1>
                    <div className="intro__textarea">
                        <Plug/>
                        <p>
                            Добавляйте и удаляйте своих учеников, редактируйте их имена, названия групп и предметов.
                        </p>
                        <NextArrow onClick={() => setStep(2)}/>
                    </div>
                </>
            }
            {
                step === 2 &&
                <>
                    <SecondImage/>
                    <h1>Создавайте группы</h1>
                    <div className="intro__textarea">
                        <PrevArrow onClick={() => setStep(1)}/>
                        <p>
                            Добавляйте разные типы работ устанавливайте максимальный балл,
                            а сервис посчитает итоговые результаты
                        </p>
                        <Plug/>
                    </div>
                </>
            }
        </div>
    )
}

export default Onboarding;