import { UserBaseInfo } from "@/entities/user/model";

export interface LoginModel {
    accessToken: string;
    user: UserBaseInfo;
}