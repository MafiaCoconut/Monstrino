import axios from 'axios';
import {AuthResponse} from "../models/responses/AuthResponse";
import {IUser} from "../models/IUser";


const BACKEND_URL = import.meta.env.VITA_BACKEND_URL
export const API_URL = `${BACKEND_URL}/api/v1`

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
})

export default $api;