import { getRequests, deleteRequest, getPlumbers, saveCompletion, fetchCompletions, updateRequest } from "./dataAccess.js"


const mainContainer = document.querySelector("#container")
mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [, requestId] = click.target.id.split("--")
        const requests = getRequests();
        const requestIdInt = parseInt(requestId);
        let foundRequest = requests.find((request) => request.id === requestIdInt);
        foundRequest.visible = false;
        deleteRequest(foundRequest);
    }
})

mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            const [requestId, plumberId] = event.target.value.split("--")

            const requestIdInt = parseInt(requestId);
            const plumberIdInt = parseInt(plumberId);
            const completion = {
                requestId: requestIdInt,
                plumberId: plumberIdInt,
                date_created: Date.now()
            }

            const requests = getRequests();
            let foundRequest = requests.find((request) => request.id === requestIdInt);

            foundRequest.completed = true;

            saveCompletion(completion);
            updateRequest(foundRequest);
        }
    }
)



const convertRequestToListElement = (request) => {
    const plumbers = getPlumbers();
    return `
            <div class="request row" ${request.completed ? `style="background: red; color: white"` : `style="background: white"`}>
                <p class="column column-1">${request.description}</p>
                <select class="plumbers column column-2" id="plumbers">
                    <option value="">Choose</option>
                    ${plumbers.map(
        plumber => {
            return `<option value="${request.id}--${plumber.id}">${plumber.name}</option>`
        }
    ).join("")
        }
                </select>
                <button class="request__delete column column-3"
                        id="request--${request.id}">
                    Delete
                </button>
            </div>
        `
}

export const Requests = () => {
    const requests = getRequests()

    let html = `
        <div class="grid">
            <div class="row">
                <h3 id="list-header-description" class="column column-1">Description</h3>
                <h3 id="list-header-completed-by" class="column column-2">Completed By</h3>
                <h3 id="list-header-empty" class="column column-3"></h3>
            </div>    
            ${requests.map(convertRequestToListElement).join("")
        }
        </div>
    `

    return html
}