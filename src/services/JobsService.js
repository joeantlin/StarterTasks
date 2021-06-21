import axios from "axios"

let endpoint = "https://api.remotebootcamp.dev/api/jobs";

export const getAll = pageIndex => {
    const config = {
        method: "GET",
        url: `${endpoint}?pageIndex=${pageIndex}&pageSize=10`,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    }
    return axios(config);
}

export const getById = id => {
    const config = {
        method: "GET",
        url: `${endpoint}/${id}`,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    }
    return axios(config);
}

export const add = payload => {
    const config = {
        method: "POST",
        url: endpoint,
        crossdomain: true,
        data: payload,
        headers: { "Content-Type": "application/json" }
    }
    return axios(config);
}

export default { getAll, getById, add };