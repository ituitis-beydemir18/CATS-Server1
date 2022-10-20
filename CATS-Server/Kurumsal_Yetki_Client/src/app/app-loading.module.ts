import { NgModule, APP_INITIALIZER, Injectable } from "@angular/core";
import { AuthenticationService } from "./core/authentication/authentication.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import {
  TranslateModule,
  TranslateLoader,
  TranslateService,
} from "@ngx-translate/core";
import { AlertService } from "./shared/notification/services/alert.service";
import { JwtInterceptor } from "@core/interceptors/jwt.interceptor";
import { AppTranslateLoader } from "./app-translate.loader";
import { AccountService } from "@core/authentication/account.service";
import { ErrorInterceptor } from "@core/interceptors/error.interceptor";

export function AppInitFactory(
  auth: AuthenticationService,
  accout: AccountService,
  translate: TranslateService
) {
  return () =>
    new Promise((resolve, reject) => {
      // set default language for translation services
      translate.setDefaultLang("en");

      // authenticate user automatically
      auth.login().subscribe((success: boolean) => {
        if (success) {
          accout.fetchUser().subscribe((user: any) => {
            translate.use(user.language?.code);
            resolve(user);
          });
        } else {
          reject();
        }
      });
    });
}

@NgModule({
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: AppTranslateLoader,
      },
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: AppInitFactory,
      deps: [AuthenticationService, AccountService, TranslateService],
      multi: true,
    },
  ],
})
export class AppLoadingModule {}
