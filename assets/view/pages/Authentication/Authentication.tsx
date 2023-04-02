import React, { useState } from "react";

import './Authentication.scss'


import InputArea from "../../components/InputArea/InputArea";
import Button from '../../components/Button/Button'

const Authentication = () => {
    const [register, setRegister] = useState(false);
    return (
        <div className="auth__main-wrapper">
            <h2 className="auth__header">
                Войти в Ом
            </h2>
            <InputArea id="email" header="Электронная почта" type="email" placeholder="example@example.com"/>
            <InputArea id="pass" header="Пароль" type="password" placeholder="****************"/>
            {
                register &&
                <InputArea id="fullName" header="Имя, Отчество, Фамилия" type="text" placeholder="Иван Иванович Иванов"/>
            }
            <div className="auth__registerArea">
                <p>Нет аккаунта?</p>
                <p onClick={() => setRegister(true)}>Зарегестрироваться</p>
            </div>
            <Button id="loginSubmit" type="submit" data="Войти" submitFor="logination" />
        </div>
    )
}

export default Authentication;