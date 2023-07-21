import React from "react";

import './Authentication.scss'


import InputArea from "../../components/InputArea/InputArea";
import Button from '../../components/Button/Button'
import {createRoot} from "react-dom/client";
import { loginPerson, registerPerson } from "./AuthenticationHooks";
import {getLoginPageUrl} from "../../../api/pageUrls";

import Popover from "../../components/Popover/Popover";


const Authentication = () => {
    const loc = location.search;
    let isRegistered = false
    if (loc === "?path=register") {
        isRegistered = true
    }
    return (
        <>{
            isRegistered ?
            <div className="auth__main-wrapper" onKeyDown={(e) => e.key === 'Enter' && registerPerson()}>
                <h2 className="auth__header">Регистрация</h2>
                <div className='auth__input-wrapper'>
                    <InputArea id="email" header="Электронная почта" type="email" placeholder="example@example.com"/>
                    <div className="auth__info-input">
                        <InputArea id="password" header="Пароль" type="password" placeholder="****************"/>
                        <Popover header='Требования к паролю'
                                     mainText='Пароль должен содержать буквы латиницы (строчные и заглавные), цифры и специальные символы.'
                        />
                    </div>
                    <InputArea id="fullName" header="Имя, Фамилия" type="text" placeholder="Иван Иванов"/>
                </div>
                <div className="auth__registerArea">
                    <p>Уже есть аккаунт?</p>
                    <p onClick={() => window.location.href = getLoginPageUrl().replace("PATH", "login")}>
                        Войти
                    </p>
                </div>
                <Button id="loginSubmit" type="submit" data="Зарегистрироваться" onClick={() => registerPerson()} />
            </div>
            :
            <div className="auth__main-wrapper" onKeyDown={(e) => e.key === 'Enter' && loginPerson()}>
                <h2 className="auth__header">Войти в Ом</h2>
                <InputArea id="email" header="Электронная почта" type="email" placeholder="example@example.com"/>
                <InputArea id="password" header="Пароль" type="password" placeholder="****************"/>
                <div className="auth__registerArea">
                    <p>Нет аккаунта?</p>
                    <p onClick={() => window.location.href = getLoginPageUrl().replace("PATH", "register")}>
                        Зарегистрироваться
                    </p>
                </div>
                <Button id="loginSubmit" type="submit" data="Войти" onClick={() => loginPerson()}
                />
            </div>
        }</>
    )
}

export default Authentication