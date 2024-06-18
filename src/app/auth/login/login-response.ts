export interface LoginResponse {
    user: any;
    accessToken: string,
    tokenType: string,
    roles: string[]
}