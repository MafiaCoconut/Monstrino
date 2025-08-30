import { Meta } from "../../../modules/Auth/api/models/BaseModels";
import { LoginModel } from "../../../modules/Auth/api/models/LoginModel";

export interface LoginResponseData {
    meta: Meta;
    result: LoginModel;
}