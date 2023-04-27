let loginUrl = '404'

const urlsContainer = document.getElementById("urlsContainer")
if (urlsContainer) {
    loginUrl = urlsContainer.dataset["loginUrl"] ?? '404'
}

const getLoginPageUrl = () => {
    return loginUrl
}

export {
    getLoginPageUrl
}