import axios, { AxiosInstance } from 'axios';
import { AuthResponse } from './responses/authResponses';
import { Context } from "../../../main";
import UserStore from '../store/UserStore';
import { RefreshTokensResponse } from './responses/RefreshTokensResponse';


const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
export const API_URL = `${BACKEND_URL}/api/v1`
console.log('API_URL: ', API_URL)

export function createApi(userStore: UserStore): AxiosInstance {

    const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    });



    api.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${userStore.accessToken}`
        config.headers['Content-Type'] = 'application/json';
        config.headers['Accept'] = 'application/json';
        return config;
    })


    api.interceptors.response.use((config) => {
        return config;
    }, async (error) => {
        const originalRequest = error.config;
        if (error.response.status == 401 && error.config && !error.config._isRetry) {
            originalRequest._isRetry = true;
            try {
                const response = await axios.get<RefreshTokensResponse>(`${API_URL}/auth/refresh`, { withCredentials: true })
                console.log(response)
                console.log(response.data.result)
                userStore.setAccessToken(response.data.result);
                return api.request(originalRequest);
            } catch (e) {
                console.log('НЕ АВТОРИЗОВАН')
            }
        }
        throw error;
    })
    return api;
}


// export default $api;