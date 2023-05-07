import {fetchGetRequest, fetchPostRequest} from "../utility/fetchRequest";
import {responseStatus} from "../utility/responseStatus";
import {getEncryptedText} from "../utility/scrambler";
import {teacherDataType} from "../view/pages/Authentication/getTeacherData";
import {studentDataType} from "../view/pages/GroupsList/getStudentData";
import {groupDataType} from "../view/pages/GroupsList/getGroupData";

let authorizeUrl = '404'
let createTeacherUrl = '404'
let createGroupUrl = '404'
let createStudentUrl = '404'
let deleteGroupsUrl = '404'
let changeGroupTitleUrl = '404'
let changeGroupSubjectUrl = '404'

const urlsContainer = document.getElementById("urlsContainer")
if (urlsContainer) {
    authorizeUrl = urlsContainer.dataset['authorizeUrl'] ?? '404'
    createTeacherUrl = urlsContainer.dataset['createTeacherUrl'] ?? '404'
    createGroupUrl = urlsContainer.dataset['createGroupUrl'] ?? '404'
    createStudentUrl = urlsContainer.dataset['createStudentUrl'] ?? '404'
    deleteGroupsUrl = urlsContainer.dataset['deleteGroupsUrl'] ?? '404'
    changeGroupTitleUrl = urlsContainer.dataset['changeGroupTitleUrl'] ?? '404'
    changeGroupSubjectUrl = urlsContainer.dataset['changeGroupSubjectUrl'] ?? '404'
}

const login = (
    email: string,
    password: string,
) => {
    return fetchPostRequest(
        authorizeUrl,
        {
            email,
            password
        },
        [responseStatus.unauthorized]
    )
}

const createTeacher = (teacherData: teacherDataType) => {
    const encryptedPassword = getEncryptedText(teacherData.password)
    return fetchPostRequest(
        createTeacherUrl,
        {
            firstName: teacherData.firstName,
            lastName: teacherData.lastName,
            email: teacherData.email,
            encryptedPassword
        }
    ).then(
        response => {
            if (!response.ok || response.status === 409) {
                throw new Error()
            }
            return response
        }
    )
}

const createStudent = (studentData: studentDataType) => {
    return fetchPostRequest(
        createStudentUrl,
        {
            firstName: studentData.firstName,
            lastName: studentData.lastName
        }
    ).then(
        response => {
            if (!response.ok || response.status === 409) {
                throw new Error()
            }
            return response
        }
    )
}

const createGroup = (groupData: groupDataType) => {
    return fetchPostRequest(
        createGroupUrl,
        {
            teacherId: groupData.teacherId,
            title: groupData.title,
            subject: groupData.subject,
            studentsList: [],
            tasksList: []
        }
    ).then(
        response => {
            if (!response.ok || response.status === 409) {
                throw new Error()
            }
            return response
        }
    )
}

const deleteGroups = (groupIdList: Array<string>, teacherId: string) => {
    return fetchPostRequest(
        deleteGroupsUrl,
        {
            groupIdList: groupIdList.map(id => parseInt(id)),
            teacherId: parseInt(teacherId)
        }
    ).then(
        response => {
            if (!response.ok || response.status === 409) {
                throw new Error()
            }
            return response
        }
    )
}

const changeGroupTitle = (groupId: string, title: string) => {
    return fetchPostRequest(
        changeGroupTitleUrl,
        {
            groupId: parseInt(groupId, 10),
            title: title
        }
    )
}

const changeGroupSubject = (groupId: string, subject: string) => {
    return fetchPostRequest(
        changeGroupSubjectUrl,
        {
            groupId: parseInt(groupId, 10),
            subject: subject
        }
    )
}

export {
    login,
    createTeacher,
    createStudent,
    createGroup,
    deleteGroups,
    changeGroupTitle,
    changeGroupSubject
}