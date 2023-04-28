import React, {useState} from "react";

import './Authentication.scss'


import InputArea from "../../components/InputArea/InputArea";
import Button from '../../components/Button/Button'
import {createRoot} from "react-dom/client";
import {getLoginTeacherData, getRegisterTeacherData, teacherDataType} from "./common/getTeacherData";
import {createTeacher, login} from "../../../api/requests";

const Authentication = () => {
    const [register, setRegister] = useState(false);

    return (
        <div className="auth__main-wrapper" id={"authenticationPageRoot"}>
            <h2 className="auth__header">
                Войти в Ом
            </h2>
            <InputArea id="email" header="Электронная почта" type="email" placeholder="example@example.com"/>
            <InputArea id="password" header="Пароль" type="password" placeholder="****************"/>
            {
                register &&
                <InputArea id="fullName" header="Имя, Отчество, Фамилия" type="text"
                           placeholder="Иван Иванович Иванов"/>
            }
            <div className="auth__registerArea">
                <p>Нет аккаунта?</p>
                <p onClick={() => setRegister(true)}>Зарегистрироваться</p>
            </div>
            <Button id="loginSubmit" type="submit" data="Войти" onClick={() => {
                const emailInput = document.querySelector('#email') as HTMLInputElement
                const passwordInput = document.querySelector('#password') as HTMLInputElement
                const loginButton = document.querySelector('#loginSubmit') as HTMLButtonElement

                if (register) {
                    const nameInput = document.querySelector('#fullName') as HTMLInputElement
                    if (loginButton) {
                        const onLoginButtonAction = () => {
                            const teacherData: teacherDataType = {
                                firstName: "",
                                lastName: "",
                                email: "",
                                password: "",
                            }
                            getRegisterTeacherData(nameInput, emailInput, passwordInput, teacherData)
                            createTeacher(teacherData).then()
                        }
                        onLoginButtonAction()
                    }
                } else {
                    if (loginButton) {
                        const onLoginButtonAction = () => {
                            const teacherData: teacherDataType = {
                                email: "",
                                password: "",
                            }
                            getLoginTeacherData(emailInput, passwordInput, teacherData)
                            login(teacherData.email, teacherData.password).then()
                        }
                        onLoginButtonAction()
                    }
                }
            }}
            />
        </div>
    )
}


const renderAuthenticationPage = (rootId: string) => {
    const rootElement = document.getElementById(rootId)
    const root = createRoot(rootElement)

    root.render(
        <Authentication/>
    )
}

export {renderAuthenticationPage};