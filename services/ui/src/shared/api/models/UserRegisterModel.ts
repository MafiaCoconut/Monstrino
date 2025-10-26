import { UserBaseInfo } from "@/entities/user/model";

export interface UserRegisterModel {
    accessToken: string;
    user: UserBaseInfo;
}