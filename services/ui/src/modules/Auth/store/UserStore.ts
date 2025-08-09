import { makeAutoObservable } from "mobx";
import AuthService from "../services/AuthService";
import { IUser } from "../../../models/IUser";
import { UserBaseInfo } from "../../../models/userModels/UserBaseInfo";

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

    async registration(username: string, email: string, password: string) { 
        console.log("start registration")
        try {
            const response = await AuthService.registration(username, email, password);
            console.log(response);
            this.setAuth(true);
            console.log("accessToken before: " + this.accessToken);
            this.setAccessToken(response.data.result);

        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async checkAuth(){
        console.log(this.accessToken)
        console.log(this.isAuth)
        
        console.log("start refresh")
        try {
            const response = await AuthService.status();
            console.log(response);
        } catch (e: any) {
            console.log(e.response?.data?.message);
            // if (e.response.status === 405){
            //     const response_refresh = await AuthService.refreshTokens();
            //     console.log(response_refresh);
            // }
        }
    }

}