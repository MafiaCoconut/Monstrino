import { makeAutoObservable } from "mobx";
import AuthService from "../services/AuthService";
import { IUser } from "../../../models/IUser";
import { UserBaseInfo } from "../../../models/userModels/UserBaseInfo";

export default class UserStore {
    user = {} as UserBaseInfo;
    isAuth = false;
    isLoading = false;

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
            this.setUser(response.data.user);
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

    async checkAuth(){
        console.log("start refresh")
        try {
            const response = await AuthService.checkAuth();
            console.log(response);
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
    }

}