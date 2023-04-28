import {removeExtraBlanks} from "../../../../utility/removeExtraBlanks";

type teacherDataType = {
    email: string,
    password: string,
    firstName?: string,
    lastName?: string
}

const getRegisterTeacherData = (
    emailInput: HTMLInputElement,
    passwordInput: HTMLInputElement,
    nameInput: HTMLInputElement,
    teacherData: teacherDataType
) => {
    const namesString = removeExtraBlanks(nameInput.value)
    const namesArr = namesString.split(' ')
    teacherData.firstName = namesArr[1]
    teacherData.lastName = namesArr[0]
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