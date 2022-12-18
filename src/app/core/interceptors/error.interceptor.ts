import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpHandler,
  HttpEvent,
  HttpRequest,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AlertService } from "@shared/notification/services/alert.service";
import { TranslateService } from "@ngx-translate/core";

@Injectable({
  providedIn: "root",
})
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private alert: AlertService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Handle error with translation functions
    return next.handle(request).pipe(
      catchError((error) => {
        if (
          error instanceof HttpErrorResponse &&
          error.url.includes("/api") &&
          error.status > 0
        ) {
          let errorText = `${error.status}-${error.statusText}`;
          let message = errorText;
          let description = `${errorText} (Description)`;
          this.alert.error(message, description);
        }
        return throwError(() => error);
      })
    );
  }
}
