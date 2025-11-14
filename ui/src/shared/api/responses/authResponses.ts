import { IUser } from "@/entities/user/model";

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user: IUser;
}

