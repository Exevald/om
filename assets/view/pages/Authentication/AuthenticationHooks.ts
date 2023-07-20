import { getGroupsListPageUrl, getOnboardingPageUrl } from "../../../api/pageUrls"
import { createTeacher, login } from "../../../api/requests"
import { teacherDataType, getRegisterTeacherData, getLoginTeacherData } from "./getTeacherData"
import ToastManager from "../../components/ToastManager/ToastManager";


function registerPerson() {
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
        const onRegisterButtonAction = () => {
            getRegisterTeacherData(nameInput, emailInput, passwordInput, teacherData)
            createTeacher(teacherData).then(
                (response) => {
                    if (!response.ok) {
                        throw new Error('Error occurred!')
                    }
                    window.location.href = getOnboardingPageUrl()
                }
            ).catch((err) => {
                ToastManager.add('Введены некорректные данные', 3000)
            })
        }
        onRegisterButtonAction()
    }
}

function loginPerson() {
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
                (response) => {
                    if (!response.ok) {
                        throw new Error('Error occurred!')
                    }
                    window.location.href = getGroupsListPageUrl()
                }
            )
                .catch((err) => {
                    ToastManager.add('Заполните поля', 3000)
                })
        }
        onLoginButtonAction()
    }
}


export {registerPerson, loginPerson}