let titleUrl = '404'
let loginUrl = '404'
let onboardingUrl = '404'
let groupsListUrl = '404'
let editGroupUrl = '404'

const urlsContainer = document.getElementById("urlsContainer")
if (urlsContainer) {
    titleUrl = urlsContainer.dataset["titleUrl"] ?? '404'
    loginUrl = urlsContainer.dataset["loginUrl"] ?? '404'
    onboardingUrl = urlsContainer.dataset["onboardingUrl"] ?? '404'
    groupsListUrl = urlsContainer.dataset["groupsListUrl"] ?? '404'
    editGroupUrl = urlsContainer.dataset["editGroupUrl"] ?? '404'
}

const getTitlePageUrl = () => {
    return titleUrl
}

const getLoginPageUrl = () => {
    return loginUrl
}

const getOnboardingPageUrl = () => {
    return onboardingUrl
}

const getGroupsListPageUrl = () => {
    return groupsListUrl
}

const getEditGroupPageUrl = () => {
    return editGroupUrl
}

export {
    getTitlePageUrl,
    getLoginPageUrl,
    getOnboardingPageUrl,
    getGroupsListPageUrl,
    getEditGroupPageUrl
}