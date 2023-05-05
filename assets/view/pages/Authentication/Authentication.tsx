import React, {useState} from "react";

import './Authentication.scss'


import InputArea from "../../components/InputArea/InputArea";
import Button from '../../components/Button/Button'
import {createRoot} from "react-dom/client";
import { loginPerson, registerPerson } from "./AuthenticationHooks";

enum AuthenticationPath {
    login = 0,
    register = 1
}

interface AuthenticationProps {
    path: AuthenticationPath
}

const Authentication = (props: AuthenticationProps) => {
    // const [register, setRegister] = useState(false);
    let register = false
    if (props.path === 1) {
        register = true
    }
    return (
        <div className="auth__main-wrapper">
        {
            register ?
            <>
                <h2 className="auth__header">Регистрация</h2>
                <InputArea id="email" header="Электронная почта" type="email" placeholder="example@example.com"/>
                <InputArea id="password" header="Пароль" type="password" placeholder="****************"/>
                <InputArea id="fullName" header="Имя, Фамилия" type="text" placeholder="Иван Иванов"/>
                <Button id="loginSubmit" type="submit" data="Зарегистрироваться" onClick={() => registerPerson()}/>
            </>
            :
            <>
                <h2 className="auth__header">Войти в Ом</h2>
                <InputArea id="email" header="Электронная почта" type="email" placeholder="example@example.com"/>
                <InputArea id="password" header="Пароль" type="password" placeholder="****************"/>
                <div className="auth__registerArea">
                    <p>Нет аккаунта?</p>
                    <p onClick={() => register = true}>Зарегистрироваться</p>
                </div>
                <Button id="loginSubmit" type="submit" data="Войти" onClick={() => loginPerson()}
                />
            </>
        }
        </div>
    )
}


const renderAuthenticationPage = (rootId: string) => {
    const loc = location.search
    const rootElement = document.getElementById(rootId)
    const root = createRoot(rootElement)
    console.log(loc)
    let path: AuthenticationPath
    if (loc === "?path=register") {
        path = AuthenticationPath.register
    }
    if (loc === "?path=login") {
        path = AuthenticationPath.login
    }
    root.render(
        <Authentication path={path}/>
    )
}

export {Authentication, renderAuthenticationPage}