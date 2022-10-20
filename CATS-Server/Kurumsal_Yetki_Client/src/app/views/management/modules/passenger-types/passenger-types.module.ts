import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "@shared/shared.module";
import { PassengerTypesComponent } from "./passenger-types.component";
import { ManagePassengerTypesComponent } from "./manage-passenger-types/manage-passenger-types.component";
import { EditPassengerTypeDialogComponent } from "./edit-passenger-type-dialog/edit-passenger-type-dialog.component";

@NgModule({
    imports: [CommonModule, SharedModule],
    declarations: [
        PassengerTypesComponent,
        ManagePassengerTypesComponent,
        EditPassengerTypeDialogComponent,
    ]
})
export class PassengerTypesModule {}
