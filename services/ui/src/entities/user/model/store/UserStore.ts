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

    async registration(username: string, email: string, password: string): Promise<{ success: boolean, typeOfError?: string}> {
        console.log("start registration")
        try {
            const response = await AuthService.registration(username, email, password);
            console.log("========================================================")
            console.log(toJS(this.user))
            console.log(email)
            console.log(username)
            this.setUser({username: username, email: email, firstName: "", lastName: "", createdAt: "", updatedAt: ""});
            console.log(toJS(this.user))

            this.setAuth(true);
            this.setAccessToken(response.data.result);
            // return response as AxiosResponse<UserRegistrationResponse>;
            return {success: true}
        } catch (e: any) {
            console.log(e.response?.data?.meta);
            let typeOfError = ""
            switch (e.response.status) {
                case 409:
                    console.log("Registration failed");
                    return {success: false, typeOfError: "user-exists"}
                case 422:
                    console.log("Validation error");
                    let result = e.response.data.result
                    typeOfError =  e.response.data.result
                    console.log(result)
                    return {success: false, typeOfError: typeOfError}
                case 500:
                    console.log("Internal server error");
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