import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertService } from '@shared/notification/services/alert.service';
import { MaterialModule } from '@shared/material/material.module';
import { AlertComponent } from '@shared/notification/components/alert/alert.component';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        TranslateModule
    ],
    declarations: [AlertComponent],
    providers: [AlertService]
})

export class NotificationModule { }
