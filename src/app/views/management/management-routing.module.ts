import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UsersComponent } from "./modules/users/users.component";
import { MasterPageComponent } from "./components/master-page/master-page.component";
import { TranslationsComponent } from "./modules/translations/translations.component";
import { ApplicationsComponent } from "./modules/applications/applications.component";
import { PassengerTypesComponent } from "./modules/passenger-types/passenger-types.component";
import { AirportsComponent } from "./modules/airports/airports.component";

const routes: Routes = [
  {
    path: "manage",
    component: MasterPageComponent,
    children: [
      { path: "users", component: UsersComponent },
      { path: "applications", component: ApplicationsComponent },
      { path: "translations", component: TranslationsComponent },
      { path: "passenger-types", component: PassengerTypesComponent },
      { path: "airports", component: AirportsComponent },
      { path: "translations", component: TranslationsComponent },
      { path: "", redirectTo: "users", pathMatch: "full" },
      { path: "**", redirectTo: "users" },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagementRoutingModule {}
