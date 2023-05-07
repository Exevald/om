import {removeExtraBlanks} from "../../../utility/removeExtraBlanks";

type teacherDataType = {
    firstName: string,
    lastName: string
    email: string,
    password: string,
}

const getRegisterTeacherData = (
    nameInput: HTMLInputElement,
    emailInput: HTMLInputElement,
    passwordInput: HTMLInputElement,
    teacherData: teacherDataType
) => {
    const namesString = removeExtraBlanks(nameInput.value)
    const namesArr = namesString.split(' ')
    teacherData.firstName = namesArr[0]
    teacherData.lastName = namesArr[1]
    teacherData.email = emailInput.value
    teacherData.password = passwordInput.value
}

const getLoginTeacherData = (
    emailInput: HTMLInputElement,
    passwordInput: HTMLInputElement,
    teacherData: teacherDataType
) => {
    teacherData.email = emailInput.value
    teacherData.password = passwordInput.value
}

export {getRegisterTeacherData, getLoginTeacherData, teacherDataType}