import { getGroupsListPageUrl, getOnboardingPageUrl } from "../../../api/pageUrls"
import { createTeacher, login } from "../../../api/requests"
import { teacherDataType, getRegisterTeacherData, getLoginTeacherData } from "./getTeacherData"


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
                () => {
                    window.location.href = getGroupsListPageUrl()
                }
            )
        }
        onLoginButtonAction()
    }
}


export {registerPerson, loginPerson}