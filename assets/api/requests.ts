import {fetchPostRequest} from "../utility/fetchRequest";
import {responseStatus} from "../utility/responseStatus";
import {getEncryptedText} from "../utility/scrambler";
import {teacherDataType} from "../view/pages/Authentication/getTeacherData";
import {
    authorizeUrl, changeGroupNameUrl, changeStudentNameUrl, changeTaskInitialsUrl, changeTaskMaxMarkUrl, createGroupUrl,
    createStudentUrl, createTaskUrl, createTeacherUrl, deleteGroupsUrl, deleteStudentsUrl, deleteTasksUrl
} from "./utilities";
import { DEFAULT_GROUP_NAME, DEFAULT_STUDENT_NAME, DEFAULT_STUDENT_SURNAME, DEFAULT_SUBJECT_NAME, DEFAULT_TASK_DESCRIPTION, DEFAULT_TASK_MAXMARK, DEFAULT_TASK_TITLE } from "../utility/utilities";


function login(email: string, password: string) {
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

function createStudent(groupId: number) {
    return fetchPostRequest(
        createStudentUrl,
        {
            groupId: groupId,
            firstName: DEFAULT_STUDENT_NAME,
            lastName: DEFAULT_STUDENT_SURNAME
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

function createGroup(teacherId: number) {
    return fetchPostRequest(
        createGroupUrl,
        {
            teacherId: teacherId,
            title: DEFAULT_GROUP_NAME,
            subject: DEFAULT_SUBJECT_NAME,
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
            groupIdList: groupIdList.map(id => parseInt(id, 10)),
            teacherId: parseInt(teacherId, 10)
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

function changeGroupInitials(groupId: string, title: string, subject: string) {
    return fetchPostRequest(
        changeGroupNameUrl,
        {
            groupId: parseInt(groupId, 10),
            title: title,
            subject: subject
        }
    )
}

function changeStudentName(studentId: string, firstName: string, lastName: string) {
    return fetchPostRequest(
        changeStudentNameUrl,
        {
            studentId: parseInt(studentId, 10),
            firstName: firstName,
            lastName: lastName
        }
    )
}

function deleteStudents(groupId: string, studentsIdList: Array<string>) {
    return fetchPostRequest(
        deleteStudentsUrl,
        {
            groupId: parseInt(groupId, 10),
            studentsIdList: studentsIdList.map(id => parseInt(id, 10))
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

function createTask(groupId: string) {
    return fetchPostRequest(
        createTaskUrl,
        {
            groupId: parseInt(groupId, 10),
            topic: DEFAULT_TASK_TITLE,
            description: DEFAULT_TASK_DESCRIPTION,
            maxMark: DEFAULT_TASK_MAXMARK
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

function deleteTasks(groupId: string, tasksIdList: Array<string>) {
    return fetchPostRequest(
        deleteTasksUrl,
        {
            groupId: parseInt(groupId, 10),
            tasksIdList: tasksIdList.map(id => parseInt(id, 10))
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

function changeTaskInitials(taskId: string, topic: string, description: string) {
    return fetchPostRequest(
        changeTaskInitialsUrl,
        {
            taskId: parseInt(taskId, 10),
            topic: topic,
            description: description
        }
    )
}

function changeTaskMaxMark(taskId: string, maxMark: number) {
    return fetchPostRequest(
        changeTaskMaxMarkUrl,
        {
            taskId: parseInt(taskId, 10),
            maxMark: maxMark
        }
    )
}

export {
    login,
    createTeacher,
    createStudent,
    createGroup,
    deleteGroups,
    changeGroupInitials,
    changeStudentName,
    deleteStudents,
    createTask,
    deleteTasks,
    changeTaskInitials,
    changeTaskMaxMark
}