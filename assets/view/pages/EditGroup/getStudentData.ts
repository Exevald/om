import { StudentFrontData } from "../../../utility/types"

function getCreateTeacherData(lastNameInput: HTMLInputElement,
    firstNameInput: HTMLInputElement,
    studentData: StudentFrontData) {
    studentData.lastName = lastNameInput.value
    studentData.firstName = firstNameInput.value
}

export {getCreateTeacherData}