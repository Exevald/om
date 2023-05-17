import {fetchPostRequest} from "../utility/fetchRequest";
import {responseStatus} from "../utility/responseStatus";
import {getEncryptedText} from "../utility/scrambler";
import {teacherDataType} from "../view/pages/Authentication/getTeacherData";
import {
    authorizeUrl,
    changeGroupNameUrl,
    changeStudentNameUrl,
    changeTaskDateUrl,
    changeTaskInitialsUrl,
    changeTaskMaxMarkUrl, changeTaskStudentMarkUrl,
    createGroupUrl, createMarkUrl,
    createStudentUrl,
    createTaskUrl,
    createTeacherUrl,
    deleteGroupsUrl,
    deleteStudentsUrl,
    deleteTasksUrl
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
    )
}

function deleteGroups(groupIdList: Array<string>, teacherId: string) {
    return fetchPostRequest(
        deleteGroupsUrl,
        {
            groupIdList: groupIdList.map(id => parseInt(id, 10)),
            teacherId: parseInt(teacherId, 10)
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
    )
}

function deleteTasks(groupId: string, tasksIdsList: Array<number>) {
    return fetchPostRequest(
        deleteTasksUrl,
        {
            groupId: parseInt(groupId, 10),
            tasksIdList: tasksIdsList
        }
    )
}

function changeTaskInitials(taskId: number, topic: string, description: string) {
    return fetchPostRequest(
        changeTaskInitialsUrl,
        {
            taskId: taskId,
            topic: topic,
            description: description
        }
    )
}

function changeTaskDate(taskId: string, date: Date) {
    return fetchPostRequest(
        changeTaskDateUrl,
        {
            taskId: parseInt(taskId, 10),
            date: date
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

function createMark(taskId: string, studentId: string, studentMark: number) {
    return fetchPostRequest(
        createMarkUrl,
        {
            taskId: parseInt(taskId, 10),
            studentId: parseInt(studentId, 10),
            studentMark: studentMark
        }
    )
}

function changeTaskStudentMark(markId: string, studentMark: number) {
    return fetchPostRequest(
        changeTaskStudentMarkUrl,
        {
            markId: parseInt(markId, 10),
            studentMark: studentMark
        }
    )
}

export {
    login, createTeacher, createStudent, createGroup,
    deleteGroups, changeGroupInitials, changeStudentName,
    deleteStudents, createTask, deleteTasks, changeTaskInitials,
    changeTaskMaxMark, changeTaskDate, createMark, changeTaskStudentMark
}