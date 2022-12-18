import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MaterialModule } from "@shared/material/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { NgPipesModule } from "ngx-pipes";
import { AvatarModule } from "ngx-avatar";
import { NgScrollbarModule } from "ngx-scrollbar";
import {
  NgxMatDatetimePickerModule,
  NgxMatTimepickerModule,
  NGX_MAT_DATE_FORMATS,
} from "@angular-material-components/datetime-picker";
import { NgxMatMomentModule } from "@angular-material-components/moment-adapter";
import { GraphqlModule } from "./graphql/graphql.module";
import { NotificationModule } from "./notification/notification.module";
import { UpperCaseDirective } from "./directives/upper-case.directive";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    GraphqlModule,
    NotificationModule,
    NgPipesModule,
    TranslateModule,
    NgScrollbarModule,
    NgxMatMomentModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    GraphqlModule,
    NotificationModule,
    NgPipesModule,
    TranslateModule,
    AvatarModule,
    NgScrollbarModule,
    NgxMatMomentModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    UpperCaseDirective
  ],
  declarations: [UpperCaseDirective],
  providers: [
    {
      provide: NGX_MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: "DD/MM/YYYY HH:mm",
        },
        display: {
          dateInput: "DD/MM/YYYY HH:mm",
          monthYearLabel: "MMM YYYY",
          dateA11yLabel: "LL",
          monthYearA11yLabel: "MMMM YYYY",
        },
      },
    },
  ],
})
export class SharedModule {}
