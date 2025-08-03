import { Meta } from "../models/BaseModels";
import { LoginModel } from "../models/LoginModel";

export interface LoginResponseData {
    meta: Meta;
    result: LoginModel;
}