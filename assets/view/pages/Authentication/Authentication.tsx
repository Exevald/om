import React, {useState} from "react";

import './Authentication.scss'


import InputArea from "../../components/InputArea/InputArea";
import Button from '../../components/Button/Button'
import {createRoot} from "react-dom/client";
import {getTeacherData, teacherDataType} from "./common/getTeacherData";
import {createTeacher} from "../../../api/requests";

// async function postRequest(event: React.SyntheticEvent) {
//     // мб эту строку уберу
//     event.preventDefault();
//
//     const email = document.getElementById('email') as HTMLInputElement;
//     const pass = document.getElementById('pass') as HTMLInputElement;
//     const fullName = document.getElementById('fullName') as HTMLInputElement;
//
//     if (email && pass && fullName) {
//         const data = {
//             email: email.value,
//             pass: pass.value,
//             fullName: fullName.value
//         }
//         const response = await fetch('', {
//             method: 'POST',
//             body: JSON.stringify(data),
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         })
//     } else {
//         console.log('Error in getting inputs');
//     }
// }


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
                const nameInput = document.querySelector('#fullName') as HTMLInputElement
                const emailInput = document.querySelector('#email') as HTMLInputElement
                const passwordInput = document.querySelector('#password') as HTMLInputElement
                const loginButton = document.querySelector('#loginSubmit') as HTMLButtonElement
                console.log(nameInput)
                console.log(emailInput)
                console.log(passwordInput)
                console.log(loginButton)

                if (loginButton) {
                    const onLoginButtonAction = () => {
                        const teacherData: teacherDataType = {
                            firstName: "",
                            lastName: "",
                            email: "",
                            password: "",
                        }
                        getTeacherData(nameInput, emailInput, passwordInput, teacherData)
                        createTeacher(teacherData).then()
                    }
                    onLoginButtonAction()
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