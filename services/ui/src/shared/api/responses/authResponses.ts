import { IUser } from "../../../models/IUser";
import { UserBaseInfo } from "../../../models/userModels/UserBaseInfo";

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user: IUser;
}

