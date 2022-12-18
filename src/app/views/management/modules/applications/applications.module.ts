import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "@shared/shared.module";
import { ApplicationsComponent } from "./applications.component";
import { ManageApplicationsComponent } from "./manage-applications/manage-applications.component";
import { EditApplicationDialogComponent } from "./edit-application-dialog/edit-application-dialog.component";

@NgModule({
    imports: [CommonModule, SharedModule],
    declarations: [
        ApplicationsComponent,
        ManageApplicationsComponent,
        EditApplicationDialogComponent,
    ]
})
export class ApplicationsModule {}
