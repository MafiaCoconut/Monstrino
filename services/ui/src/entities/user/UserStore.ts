import { makeAutoObservable } from "mobx";
import { AxiosResponse } from "axios";
import AuthService from "../../shared/api/AuthService";
import { UserRegistrationResponse } from "../../shared/api/responses/UserRegistrationResponse";
import { UserBaseInfo } from "./types";

export default class UserStore {
    user = {} as UserBaseInfo;
    isAuth = false;
    isLoading = false;
    accessToken: string | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setUser(user: UserBaseInfo) {
        this.user = user;
    }

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }

    setAccessToken(token: string) {
        console.log('new accessToken: ' + token);
        this.accessToken = token;
    }

    async login(email: string, password: string): Promise<boolean> {
        console.log("Start login")
        try {
            const response = await AuthService.login(email, password);
            console.log(response);
            switch (response.status) {
                case 200:
                    console.log("Login success");
                    this.setAuth(true);
                    console.log("Auth:" + this.isAuth);

                    this.setUser(response.data.result.user);
                    console.log("User:")
                    console.log(this.user);
                    return true;
                // break;
                case 401:
                    console.log("Login failed");
                    return false;
                // break;
            };

        } catch (e: any) {
            console.log("Login error");
            console.log(e);
        }
        return false;
    }

    async registration(username: string, email: string, password: string): Promise<AxiosResponse<UserRegistrationResponse>> {
        console.log("start registration")
        try {
            const response = await AuthService.registration(username, email, password);
            this.setAuth(true);
            this.setAccessToken(response.data.result);
            return response as AxiosResponse<UserRegistrationResponse>;
        } catch (e: any) {
            console.log(e.response?.data?.meta);
            switch (e.response.status) {
                case 409:
                    console.log("Registration failed");
                    break;
                case 422:
                    console.log("Validation error");
                    let result = e.response.data.result
                    console.log(result)
                    break;

            }
            return e.response as AxiosResponse<UserRegistrationResponse>
        }
    }

    async checkAuth() {
        console.log(this.accessToken)
        console.log(this.isAuth)

        console.log("start refresh")
        try {
            await AuthService.status();
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

}