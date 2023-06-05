const applicationState = {
    requests: {},
}

const API = "http://localhost:8088"
const mainContainer = document.querySelector("#container")

export const fetchRequests = () => {
    return fetch(`${API}/requests`)
        .then(response => response.json())
        .then(
            (serviceRequests) => {
                // Store the external state in application state
                let visibleRequests = [];
                for (const request of serviceRequests) {
                    if (request.visible === true) {
                        visibleRequests.push(request);
                    }
                }
                applicationState.requests = visibleRequests;
            }
        )
}

export const getRequests = () => {
    return applicationState.requests.map(request => ({ ...request }))
}

export const sendRequest = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }


    return fetch(`${API}/requests`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

export const deleteRequest = (data) => {
    const fetchOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }

    return fetch(`${API}/requests/${data.id}`, fetchOptions)
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}
export const updateRequest = (data) => {
    const fetchOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }

    return fetch(`${API}/requests/${data.id}`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

export const fetchPlumbers = () => {
    return fetch(`${API}/plumbers`)
        .then(response => response.json())
        .then(
            (data) => {
                applicationState.plumbers = data
            }
        )
}

export const getPlumbers = () => {
    return applicationState.plumbers.map(plumber => ({ ...plumber }));
}

export const saveCompletion = (completion) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(completion)
    }

    return fetch(`${API}/completions`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

export const fetchCompletions = () => {
    return fetch(`${API}/completions`)
        .then(res => res.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChange"))
        })
}
