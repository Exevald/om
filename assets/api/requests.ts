import {fetchGetRequest, fetchPostRequest} from "../utility/fetchRequest";
import {responseStatus} from "../utility/responseStatus";
import {getEncryptedText} from "../utility/scrambler";
import {teacherDataType} from "../view/pages/Authentication/getTeacherData";
import {studentDataType} from "../view/pages/EditGroup/getStudentData";
import {groupDataType} from "../view/pages/GroupsList/getGroupData";
import { 
    authorizeUrl, changeGroupSubjectUrl, changeGroupTitleUrl, createGroupUrl, 
    createStudentUrl, createTeacherUrl, deleteGroupsUrl 
} from "./utilities";


function login (email: string, password: string) {
    return fetchPostRequest(
        authorizeUrl,
        {
            email,
            password
        },
        [responseStatus.unauthorized]
    )
}

function createTeacher(teacherData: teacherDataType) {
    const encryptedPassword = getEncryptedText(teacherData.password);
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

function createStudent(studentData: studentDataType) {
    return fetchPostRequest(
        createStudentUrl,
        {
            groupId: studentData.groupId,
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

function createGroup(groupData: groupDataType) {
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

function deleteGroups(groupIdList: Array<string>, teacherId: string) {
    return fetchPostRequest(
        deleteGroupsUrl,
        {
            groupIdList: groupIdList.map(id => parseInt(id)),
            teacherId: parseInt(teacherId)
        }
    ).then(
        response => {
            if (!response.ok || response.status === 409) {
                throw new Error();
            }
            return response;
        }
    )
}

function changeGroupTitle(groupId: string, title: string) {
    return fetchPostRequest(
        changeGroupTitleUrl,
        {
            groupId: parseInt(groupId, 10),
            title: title
        }
    )
}

function changeGroupSubject(groupId: string, subject: string) {
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