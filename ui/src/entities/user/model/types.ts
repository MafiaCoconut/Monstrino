export interface IUser {
    email: string;
    isActivated: boolean;
    id: string;
}

export interface UserBaseInfo {
    id?: string;
    username: string;
    email: string;
    status: string;
    firstName: string;
    lastName: string;
    role: string;
    createdAt: string;
    updatedAt: string;
}
