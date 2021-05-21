import axios from "axios";

let endpoint = "https://api.remotebootcamp.dev/api/users";

export const login = payload => {
    const config = {
        method: "POST",
        url: `${endpoint}/login`,
        crossdomain: true,
        data: payload,
        headers: { "Content-Type": "application/json" }
    }
    return axios(config);
}

export const logout = () => {
    const config = {
        method: "GET",
        url: `${endpoint}/logout`,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    }
    return axios(config);
}

export const getAll = () => {
    const config = {
        method: "GET",
        url: `${endpoint}?pageIndex=0&pageSize=10`,
        crossdomain: true,
        headers: { "Content-Type": "application/json" }
    }
    return axios(config);
}

export const getCurrent = () => {
    const config = {
        method: "GET",
        url: `${endpoint}/current`,
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
        url: `${endpoint}/register`,
        crossdomain: true,
        data: payload,
        headers: { "Content-Type": "application/json" }
    }
    return axios(config);
}

export default { login, logout, getCurrent, getById, add };