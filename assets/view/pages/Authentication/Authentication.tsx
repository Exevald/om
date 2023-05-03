import React, {useState} from "react";

import './Authentication.scss'


import InputArea from "../../components/InputArea/InputArea";
import Button from '../../components/Button/Button'
import {createRoot} from "react-dom/client";
import {getLoginTeacherData, getRegisterTeacherData, teacherDataType} from "./common/getTeacherData";
import {createTeacher, login} from "../../../api/requests";
import {getGroupsListPageUrl, getOnboardingPageUrl} from "../../../api/pageUrls";

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
        <div className="auth__main-wrapper" id={"authenticationPageRoot"}>
            {
                register ?
                    <h2 className="auth__header">
                        Регистрация
                    </h2>
                    :
                    <h2 className="auth__header">
                        Войти в Ом
                    </h2>
            }
            <InputArea id="email" header="Электронная почта" type="email" placeholder="example@example.com"/>
            <InputArea id="password" header="Пароль" type="password" placeholder="****************"/>
            {
                register &&
                <InputArea id="fullName" header="Имя, Фамилия" type="text"
                           placeholder="Иван Иванов"/>
            }
            {
                !register &&
                <div className="auth__registerArea">
                    <p>Нет аккаунта?</p>
                    <p onClick={() => register = true}>Зарегистрироваться</p>
                </div>
            }
            {
                !register ?
                    <Button id="loginSubmit" type="submit" data="Войти" onClick={() => {
                        const emailInput = document.querySelector('#email') as HTMLInputElement
                        const passwordInput = document.querySelector('#password') as HTMLInputElement
                        const loginButton = document.querySelector('#loginSubmit') as HTMLButtonElement
                        const teacherData: teacherDataType = {
                            email: "",
                            password: "",
                            firstName: "",
                            lastName: ""
                        }
                        if (loginButton) {
                            const onLoginButtonAction = () => {
                                getLoginTeacherData(emailInput, passwordInput, teacherData)
                                login(teacherData.email, teacherData.password).then(
                                    () => {
                                        window.location.href = getGroupsListPageUrl()
                                    }
                                )
                            }
                            onLoginButtonAction()
                        }
                    }}
                    />
                    : <Button id="loginSubmit" type="submit" data="Зарегистрироваться" onClick={() => {
                        const emailInput = document.querySelector('#email') as HTMLInputElement
                        const passwordInput = document.querySelector('#password') as HTMLInputElement
                        const loginButton = document.querySelector('#loginSubmit') as HTMLButtonElement
                        const nameInput = document.querySelector('#fullName') as HTMLInputElement
                        const teacherData: teacherDataType = {
                            email: "",
                            password: "",
                            firstName: "",
                            lastName: ""
                        }
                        if (loginButton) {
                            const onLoginButtonAction = () => {
                                getRegisterTeacherData(nameInput, emailInput, passwordInput, teacherData)
                                createTeacher(teacherData).then(
                                    () => {
                                        window.location.href = getOnboardingPageUrl()
                                    }
                                )
                            }
                            onLoginButtonAction()
                        }
                    }
                    }/>
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