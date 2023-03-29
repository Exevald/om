import React from "react";

import './Authentication.scss'


import InputArea from "../../components/InputArea/InputArea";
import Button from '../../components/Button/Button'

const Authentication = () => {
    return (
        <div className="auth__main-wrapper">
            <h2 className="auth__header">
                Войти в Ом
            </h2>
            <InputArea header="Электронная почта" type="email" placeholder="example@example.com"/>
            <InputArea header="Пароль" type="password" placeholder="****************"/>
            <div className="auth__registerArea">
                <p>Нет аккаунта?</p>
                <a href="">Зарегестрироваться</a>
            </div>
            <Button type="submit" submitFor="logination" data="Войти" />
        </div>
    )
}

export default Authentication;