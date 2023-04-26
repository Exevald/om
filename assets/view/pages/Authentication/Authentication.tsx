import React, { useState } from "react";

import './Authentication.scss'


import InputArea from "../../components/InputArea/InputArea";
import Button from '../../components/Button/Button'

async function postRequest(event: React.SyntheticEvent) {
    // мб эту строку уберу
    event.preventDefault();

    const email     = document.getElementById('email') as HTMLInputElement;
    const pass      = document.getElementById('pass') as HTMLInputElement;
    const fullName  = document.getElementById('fullName') as HTMLInputElement;

    if (email && pass && fullName) {
        const data = {
            email: email.value,
            pass: pass.value,
            fullName: fullName.value
        }
        const response = await fetch('', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } else {
        console.log('Error in getting inputs');
    }
}

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
                <p onClick={() => setRegister(true)}>Зарегистрироваться</p>
            </div>
            <Button id="loginSubmit" type="submit" data="Войти"/>
        </div>
    )
}

export default Authentication;