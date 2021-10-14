import { LoginAuthorityModel } from './login-authority.model';
export interface LoginResponse{
    username:string;
    password:string;
    enabled:boolean;
    accountNonLocked: boolean;
    credentialsNonExpired: boolean;
    accountNonExpired: boolean; 
    authorities: LoginAuthorityModel[];
}