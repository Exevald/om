import { getGroupsListPageUrl, getOnboardingPageUrl } from "../../../api/pageUrls"
import { createTeacher, login } from "../../../api/requests"
import { teacherDataType, getRegisterTeacherData, getLoginTeacherData } from "./getTeacherData"
import {showToast} from "../../components/Toast/Toast";
import ToastManager from "../../components/ToastManager/ToastManager";
import toastManager from "../../components/ToastManager/ToastManager";


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
                () => {
                    window.location.href = getOnboardingPageUrl()
                }
            )
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
                    console.log('toast')
                    ToastManager.add('Не все обязательные поля заполнены', 3000)
                })
        }
        onLoginButtonAction()
    }
}


export {registerPerson, loginPerson}