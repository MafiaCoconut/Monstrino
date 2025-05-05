import { makeAutoObservable } from "mobx";
import AuthService from "../services/AuthService";
import { IUser } from "../../../models/IUser";

export default class UserStore {
    user = {} as IUser;
    isAuth = false;
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setUser(user: IUser) {
        this.user = user;
    }

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }

    async login(email: string, password: string) {
        console.log("Start login")
        try {
            const response = await AuthService.login(email, password);
            console.log(response);
            this.setAuth(true);
            this.setUser(response.data.user);
            console.log('user:')
            console.log(this.user);
        } catch (e: any) {
            console.log(e.response?.data?.message);
        }
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