import { Meta, LoginModel } from "@shared/api/models";

export interface LoginResponse {
    meta: Meta;
    result: LoginModel;
}