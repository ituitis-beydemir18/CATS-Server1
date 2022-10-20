import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "@shared/shared.module";
import { AirportsComponent } from "./airports.component";
import { ManageAirportsComponent } from "./manage-airports/manage-airports.component";
import { EditAirportDialogComponent } from "./edit-airport-dialog/edit-airport-dialog.component";

@NgModule({
    imports: [CommonModule, SharedModule],
    declarations: [
        AirportsComponent,
        ManageAirportsComponent,
        EditAirportDialogComponent,
    ]
})
export class AirportsModule {}
