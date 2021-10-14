import { LoginResponse } from "./login-response.model";

export interface LoginModel{
    userData:LoginResponse;
    token:string;
}