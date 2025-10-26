import { Meta } from "@shared/api/models";
import { UserRegisterModel } from "../models/UserRegisterModel";

export interface UserRegistrationResponse {
    meta: Meta;
    result: UserRegisterModel;
}

