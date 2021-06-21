import axios from "axios";

// let endpoint = "https://api.remotebootcamp.dev/api/friends";
let endpoint = "http://localhost:50000/api/friends";

export const getAll = (pageIndex = 0, pageSize = 4) => {
    const config = {
        method: "GET",
        url: `${endpoint}?pageIndex=${pageIndex}&pageSize=${pageSize}`,
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

export const getBySearchQuery = (query, pageIndex = 0, pageSize = 4) => {
    const config = {
        method: "GET",
        url: `${endpoint}/search?pageIndex=${pageIndex}&pageSize=${pageSize}&query=${query}`,
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

export const update = (payload, id) => {
    const config = {
        method: "PUT",
        url: `${endpoint}/${id}`,
        crossdomain: true,
        data: payload,
        headers: { "Content-Type": "application/json" }
    }
    return axios(config);
}

export const remove = id => {
    const config = {
        method: "DELETE",
        url: `${endpoint}/${id}`,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    }
    return axios(config).then(() => id)
}

export default { getAll, getById, getBySearchQuery, add, update, remove };