
import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";

import { environment } from "src/environments/environment";

import { Router } from "@angular/router";
import { LoginRequest } from "../model/req/login-request.model";
import { LoginResponse } from "../model/res/login-response.model";
import { LoginModel } from "../model/res/login.model";
import { ChangePasswordReqModel } from "../model/req/change-password-req.model";

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  private readonly URL: string = "http://localhost:8080/";
  private readonly CURRENT_USER = "currentUser";
  loginModel!:LoginModel;
  user!:LoginResponse;
  private currentUserSubject: BehaviorSubject<LoginModel>;
  public currentUser: Observable<LoginModel>;

  constructor(private httpClient: HttpClient,private router: Router) {
    let localStorageValue=localStorage.getItem(this.CURRENT_USER);
    let jsonValue;
    if(localStorageValue){
      jsonValue=JSON.parse(localStorageValue?localStorageValue:'');
    }
    this.currentUserSubject = new BehaviorSubject<LoginModel>(
      jsonValue
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): LoginModel {
    return this.currentUserSubject.value;
  }

login(
loginReq:LoginRequest
  ):Observable<HttpResponse<LoginResponse>> {
    return this.httpClient
      .post<LoginResponse>(this.URL + "login",loginReq,{ observe: 'response' })
      .pipe(
        map((user) => {
          if (user && user.headers.get("Authorization")) {
            let tokenValue=user.headers.get("Authorization");
            localStorage.setItem(this.CURRENT_USER, JSON.stringify(tokenValue));
            const currentUser:LoginModel= {
              userData :user.body?user.body:this.user,
              token   :tokenValue?tokenValue:''
            };
            this.currentUserSubject.next(currentUser);
          }
          return user;
        })
      );
  }

  logout() {
    localStorage.removeItem(this.CURRENT_USER);
    this.currentUserSubject.next(this.loginModel);
    this.router.navigate([`/auth/login`]);
  }

  forgetPassword(email:string):Observable<void>  {
    console.log(email);
    return this.httpClient.post<void>(`${this.URL}api/user/request-reset-password`, {email});
  }
  
  changePassword(changePasswordReq:ChangePasswordReqModel):Observable<void>  {
    return this.httpClient.post<void>(`${this.URL}api/user/change-password`, changePasswordReq);
  }
}
