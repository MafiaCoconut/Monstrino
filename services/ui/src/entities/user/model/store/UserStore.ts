import { makeAutoObservable, toJS } from "mobx";
import { AxiosResponse } from "axios";
import { UserBaseInfo } from "../types";
import AuthService from "@/shared/api/services/AuthService";
import { UserRegistrationResponse } from "@/shared/api/responses";

export class UserStore {
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

    getAllData() {
        return [toJS(this.user), this.isAuth, this.isLoading, this.accessToken];
    }

    async login(email: string, password: string): Promise<boolean> {
        try {
            const response = await AuthService.login(email, password);
            switch (response.status) {
                case 200:
                    this.setAuth(true);
                    this.setUser(response.data.result.user);
                    return true;
                case 401:
                    return false;
            };

        } catch (e: any) {
            console.log("Login error");
            console.log(e);
        }
        return false;
    }

    async registration(username: string, email: string, password: string): Promise<{ success: boolean, typeOfError?: string}> {
        try {
            const response = await AuthService.registration(username, email, password);
            this.setUser(response.data.result.user)
            this.setAuth(true);
            this.setAccessToken(response.data.result.accessToken);
            return {success: true}
        } catch (e: any) {
            console.log(e.response?.data?.meta);
            let typeOfError = ""
            switch (e.response.status) {
                case 409:
                    if (e.response.data.result == "email"){
                        typeOfError = "email-exists"
                    } else {
                        typeOfError = "username-exists"
                    }
                    return {success: false, typeOfError: typeOfError}
                case 422:
                    typeOfError =  e.response.data.result
                    return {success: false, typeOfError: typeOfError}
                case 500:
                    return {success: false, typeOfError: "internal-server-error"}
            }
            return {success: false, typeOfError: "internal-server-error"}


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