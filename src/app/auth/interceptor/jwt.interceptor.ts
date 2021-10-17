import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";

import { environment } from "src/environments/environment";
import { AuthenticationService } from "src/app/core/service/authetication.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const currentUser = this.authenticationService.currentUserValue;
    console.log(currentUser);
    const isLoggedIn = currentUser;
    const isApiUrl = request.url.startsWith(environment.baseURL);
    if (isLoggedIn && isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `${currentUser.token}`,
        },
      });
    }
    return next.handle(request);
  }
}
