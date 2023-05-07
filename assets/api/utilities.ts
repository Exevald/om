/**
 *  Pages routes
 */
const titleUrl = '/'
const loginUrl = '/login?path=PATH'
const onboardingUrl = '/onboarding'
const groupsListUrl = '/groups/list'
const editGroupUrl = '/groups/edit'


/**
 * Api routes
 */
const authorizeUrl = 'api/v1/authorize'
const createTeacherUrl = 'api/v1/teacher/create'
const createGroupUrl = '/api/v1/group/create'
const createStudentUrl = '404'
const deleteGroupsUrl = '/api/v1/group/delete'
const changeGroupTitleUrl = '/api/v1/group/title/change'
const changeGroupSubjectUrl = '/api/v1/group/subject/change'


export {
    titleUrl, loginUrl, onboardingUrl, groupsListUrl, editGroupUrl,
    authorizeUrl, createTeacherUrl, createGroupUrl, createStudentUrl, deleteGroupsUrl,
    changeGroupTitleUrl, changeGroupSubjectUrl
}