type studentDataType = {
    firstName: string,
    lastName: string
}

const getCreateTeacherData = (
    lastNameInput: HTMLInputElement,
    firstNameInput: HTMLInputElement,
    studentData: studentDataType
) => {
    studentData.lastName = lastNameInput.value
    studentData.firstName = firstNameInput.value
}

export {getCreateTeacherData, studentDataType}