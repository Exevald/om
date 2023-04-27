import {fetchGetRequest, fetchPostRequest} from "../utility/fetchRequest";
import {responseStatus} from "../utility/responseStatus";
import {getEncryptedText} from "../utility/scrambler";
import {teacherDataType} from "../view/pages/Authentication/common/getTeacherData";

let authorizeUrl = '404'
let createTeacherUrl = '404'

const urlsContainer = document.getElementById("urlsContainer")
if (urlsContainer) {
    authorizeUrl = urlsContainer.dataset['authorizeUrl'] ?? '404'
    createTeacherUrl = urlsContainer.dataset['createTeacherUrl'] ?? '404'
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

export {
    login,
    createTeacher
}