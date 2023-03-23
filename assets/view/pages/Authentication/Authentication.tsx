import React from "react";

import './Authentication.scss'


import InputArea from "../../components/InputArea/InputArea";

const Authentication = () => {
    return (
        <div className="auth__main-wrapper">
            <h2>Войти в Ом</h2>
            <InputArea header="Электронная почта" type="email" placeholder="Электронная почта"/>
            <InputArea header="Пароль" type="password" placeholder="Пароль"/>
        </div>
    )
}

export default Authentication;