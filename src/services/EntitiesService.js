import axios from "axios";

let endpoint = "https://api.remotebootcamp.dev/api/entities";

export const getAll = entityName => {
    const config = {
        method: "GET",
        url: `${endpoint}/${entityName}`,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    }
    return axios(config);
}

export const add = (entityName, payload) => {
    const config = {
        method: "POST",
        url: `${endpoint}/${entityName}`,
        crossdomain: true,
        data: payload,
        headers: { "Content-Type": "application/json" }
    }
    return axios(config);
}

export default { getAll, add };