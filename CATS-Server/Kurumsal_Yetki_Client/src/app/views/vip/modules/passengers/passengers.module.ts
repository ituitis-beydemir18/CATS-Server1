import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "@shared/shared.module";
import { PassengersComponent } from "./passengers.component";
import { ManagePassengersComponent } from "./manage-passengers/manage-passengers.component";
import { EditPassengerDialogComponent } from "./edit-passenger-dialog/edit-passenger-dialog.component";
import { PassengerFilterDialogComponent } from './passenger-filter-dialog/passenger-filter-dialog.component';

@NgModule({
    imports: [CommonModule, SharedModule],
    declarations: [
        PassengersComponent,
        ManagePassengersComponent,
        EditPassengerDialogComponent,
        PassengerFilterDialogComponent,
    ]
})
export class PassengersModule {}
