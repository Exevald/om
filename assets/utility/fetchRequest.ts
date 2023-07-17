const fetchPostRequest = async (
    requestUrl: string,
    dataObject?: object,
    ignoredStatuses?: number[]
) => {
    return fetch(requestUrl, {
        method: 'POST',
        body: JSON.stringify(dataObject)
    }).then(response => {
        if (!response.ok) {
            if (ignoredStatuses && ignoredStatuses.includes(response.status)) {
                return response
            }
            throw new Error()
        }
        return response
    })
}

const fetchGetRequest = async (
    requestUrl: string
) => {
    return fetch(requestUrl, {
        method: 'GET',
    }).then(response => {
        if (!response.ok) {
            throw new Error()
        }
        return response.json()
    })
}

export { fetchPostRequest, fetchGetRequest }