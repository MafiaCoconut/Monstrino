export interface IUser {
    email: string;
    isActivated: boolean;
    id: string;
}

export interface UserBaseInfo {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    createdAt: string;
    updatedAt: string;
}
