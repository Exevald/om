import {studentDataType} from "../EditGroup/getStudentData";

type groupDataType = {
    teacherId: number,
    title: string,
    subject: string,
    studentsList: Array<studentDataType>,
    tasksList: any
}

const getChangeGroupData = (
    titleInput: HTMLInputElement,
    subjectInput: HTMLInputElement,
    groupData: groupDataType
) => {
    groupData.title = titleInput.value
    groupData.subject = subjectInput.value
}

export {getChangeGroupData, groupDataType}