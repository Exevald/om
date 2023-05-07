import { titleUrl, loginUrl, onboardingUrl, groupsListUrl, editGroupUrl } from "./utilities"



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