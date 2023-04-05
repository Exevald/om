import React, { useState } from "react";
import Button from "../../components/Button/Button";

import './Onboarding.scss'


const FirstImage = () => {
    return (
        <img className="intro__images"
            src="./images/FirstAbstract.svg"
            alt="Первая векторная абстракция"
        />
    )
}
const SecondImage = () => {
    return (
        <img className="intro__images"
            src="./images/SecondAbstract.svg"
            alt="Вторая векторная абстракция"
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

interface dotsProps {
    step: number,
    setStep: React.Dispatch<React.SetStateAction<number>>
}
const Dots = (props: dotsProps) => {
    return (
        <div className="intro__dots">
                {
                    props.step === 1 && 
                    <>
                        <div></div>
                        <div className="intro__dot-active" onClick={() => props.setStep(2)}></div>
                    </>
                }
                {
                    props.step === 2 && 
                    <>
                        <div className="intro__dot-active" onClick={() => props.setStep(1)}></div>
                        <div></div>
                    </>
                }
            </div>
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
                        <p className="intro__secondText">
                            Добавляйте разные типы работ устанавливайте максимальный балл,
                            а сервис посчитает итоговые результаты
                        </p>
                        <Plug/>
                    </div>
                </>
            }
            <Dots step={step} setStep={setStep}/>
            {
                step === 1 && <Button type="transparent" data="Пропутить"/>
            }
            {
                step === 2 && <Button type="filled" data="К группам"/>
            }
        </div>
    )
}

export default Onboarding;