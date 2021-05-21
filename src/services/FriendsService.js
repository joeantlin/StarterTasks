import axios from "axios";

let endpoint = "https://api.remotebootcamp.dev/api/friends";

export const getAll = () => {
    const config = {
        method: "GET",
        url: `${endpoint}?pageIndex=0&pageSize=10`,
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
    return axios(config);
}

export default { getAll, getById, add, update, remove };