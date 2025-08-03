import { UserBaseInfo } from "../../../../models/userModels/UserBaseInfo";

export interface LoginModel {
    accessToken: string;
    user: UserBaseInfo
}