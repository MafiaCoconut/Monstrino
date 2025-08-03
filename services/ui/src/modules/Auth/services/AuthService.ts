import $api from '../api';
import { AxiosResponse } from 'axios';
import { AuthResponse } from '../api/responses/authResponses';
import { LoginResponseData } from '../api/responses/LoginResponse';

export default class AuthService {
    static async login(email: string, password: string) {
        return $api.post<LoginResponseData>('/auth/login', { email, password }, { validateStatus: status => status === 200 || status === 401 });
    }
    static async registration(username: string, email: string, password: string) {
        return $api.post<AuthResponse>('/auth/registration', { username, email, password });
    }
    static async logout() {
        return $api.post('/auth/logout');
    }
    static async checkAuth() {
        return $api.post<AuthResponse>('/auth/refresh');
    }
    static async getUser() {
        return $api.get('/auth/user');
    }
    static async updateUser(email: string, password: string) {
        return $api.put('/auth/user', { email, password });
    }
    static async deleteUser() {
        return $api.delete('/auth/user');
    }
}