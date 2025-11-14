import { AxiosResponse } from 'axios';
import { AuthResponse, LoginResponse, UserRegistrationResponse } from '@shared/api/responses';
import { api } from '@/main';

export default class AuthService {
    static async login(email: string, password: string) {
        return api.post<LoginResponse>('/auth/login', { email, password }, { validateStatus: status => status === 200 || status === 401 });
    }
    static async registration(username: string, email: string, password: string) {
        return api.post<UserRegistrationResponse>('/auth/registration', { username, email, password });
    }
    static async logout() {
        return api.post('/auth/logout');
    }
    static async refreshTokens() {
        return api.get<AuthResponse>('/auth/refresh');
    }
    static async status() {
        return api.get<AuthResponse>('/auth/status');
    }
    static async getUser() {
        return api.get('/auth/user');
    }
    static async updateUser(email: string, password: string) {
        return api.put('/auth/user', { email, password });
    }
    static async deleteUser() {
        return api.delete('/auth/user');
    }
}