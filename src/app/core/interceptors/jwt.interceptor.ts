import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpHandler,
  HttpEvent,
  HttpRequest,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { AuthenticationService } from "@core/authentication/authentication.service";

@Injectable({
  providedIn: "root",
})
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    private authApi: AuthenticationService,
    private translate: TranslateService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add jwt token to authorization header if available
    let currentIdentity = this.authApi.currentIdentityValue;
    if (currentIdentity && currentIdentity.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentIdentity.token}`,
        },
      });
    }

    return next.handle(request);
  }
}
