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
    const emailHeader = document.getElementsByClassName('inputArea__header')[0];
    const passwordHeader = document.getElementsByClassName('inputArea__header')[1];
    let errCode: number;
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
                        errCode = response.status
                        throw new Error('Error occurred!')
                    }
                    window.location.href = getGroupsListPageUrl()
                }
            )
                .catch((err) => {
                    if(errCode === 401)
                        ToastManager.add('Заполните поля', 3000)
                    else {
                        ToastManager.add('Неверные почта или пароль', 3000);
                        emailInput.classList.add("inputArea__input_error");
                        passwordInput.classList.add("inputArea__input_error");
                        emailHeader.classList.add("inputArea__header_error");
                        passwordHeader.classList.add("inputArea__header_error");
                        emailInput.addEventListener('click', ()=> {
                            emailInput.classList.remove("inputArea__input_error");
                                emailHeader.classList.remove("inputArea__header_error")},
                            {once:true}
                        );
                        passwordInput.addEventListener('click', ()=> {
                                passwordInput.classList.remove("inputArea__input_error");
                                passwordHeader.classList.remove("inputArea__header_error")},
                            {once:true}
                        )
                    }

                })
        }
        onLoginButtonAction()
    }
}




export {registerPerson, loginPerson}