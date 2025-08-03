export interface Meta {
    code: number;
    message: string;
    description: string;
}

export interface BaseResponse {
    meta: Meta;
    result: any;
}