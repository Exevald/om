/**
 *  Pages routes
 */
const titleUrl = '/'
const loginUrl = '/login?path=PATH'
const onboardingUrl = '/onboarding'
const groupsListUrl = '/groups/list'
const editGroupUrl = '/groups/edit?groupId=GROUP_ID'
const marksTableUrl = '/table?groupId=GROUP_ID'

/**
 * Page data API routes
 */
const groupsListUrlApi = '/api/v1/groups/get'
const groupEditUrlApi = '/api/v1/groups/edit'
const marksTableUrlApi = '/api/v1/table/get/GROUP_ID'

/**
 * API routes
 */
const authorizeUrl = 'api/v1/authorize'
const logoutUrl = '/api/v1/logout'
const createTeacherUrl = 'api/v1/teacher/create'
const createGroupUrl = '/api/v1/group/create'
const createStudentUrl = '/api/v1/student/create'
const deleteGroupsUrl = '/api/v1/group/delete'
const changeGroupNameUrl = '/api/v1/group/name/change'
const getGroupDataByIdUrl = '/api/v1/group/get/GROUP_ID'
const changeStudentNameUrl = '/api/v1/student/name/change'
const deleteStudentsUrl = '/api/v1/student/delete'
const getTaskDataByIdUrl = '/api/v1/task/get/TASK_ID'
const createTaskUrl = '/api/v1/task/create'
const deleteTasksUrl = '/api/v1/task/delete'
const changeTaskInitialsUrl = '/api/v1/task/initials/change'
const changeTaskDateUrl = '/api/v1/task/date/change'
const changeTaskMaxMarkUrl = 'api/v1/task/max_mark/change'
const createMarkUrl = '/api/v1/mark/create'
const changeTaskStudentMarkUrl = '/api/v1/mark/student_mark/change'
const deleteMarkUrl = '/api/v1/mark/delete'

export {
    titleUrl, loginUrl, onboardingUrl, groupsListUrl, editGroupUrl,
    groupsListUrlApi, groupEditUrlApi,
    authorizeUrl, createTeacherUrl, createGroupUrl, createStudentUrl, deleteGroupsUrl,
    changeGroupNameUrl, getGroupDataByIdUrl,
    changeStudentNameUrl, deleteStudentsUrl,
    marksTableUrl, getTaskDataByIdUrl, createTaskUrl, deleteTasksUrl, changeTaskInitialsUrl,
    changeTaskDateUrl, changeTaskMaxMarkUrl, marksTableUrlApi, createMarkUrl,
    changeTaskStudentMarkUrl, deleteMarkUrl, logoutUrl
}