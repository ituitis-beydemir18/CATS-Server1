import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "@shared/shared.module";
import { ManagementRoutingModule } from "@views/management/management-routing.module";
import { MasterPageComponent } from "./components/master-page/master-page.component";
import { UsersModule } from "./modules/users/users.module";
import { TranslationsModule } from "./modules/translations/translations.module";
import { ApplicationsModule } from "./modules/applications/applications.module";
import { PassengerTypesModule } from "./modules/passenger-types/passenger-types.module";
import { AirportsModule } from "./modules/airports/airports.module";
import { AirportSelectorComponent } from "./components/airport-selector/airport-selector.component";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    UsersModule,
    TranslationsModule,
    ApplicationsModule,
    PassengerTypesModule,
    AirportsModule,
    ManagementRoutingModule
  ],
  declarations: [MasterPageComponent, AirportSelectorComponent],
})
export class ManagementModule {}
