import React from "react";

import './Authefication.scss'


import InputArea from "../../components/InputArea/InputArea";

const Aunthefication = () => {
    return (
        <div className="auth__main-wrapper">
            <h2>Войти в Ом</h2>
            <InputArea header="Электронная почта" placeholder="Электронная почта"/>
            <InputArea header="Пароль" placeholder="Пароль"/>
        </div>
    )
}

export default Aunthefication;