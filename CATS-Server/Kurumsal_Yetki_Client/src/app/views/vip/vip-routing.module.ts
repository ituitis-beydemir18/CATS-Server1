import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MasterPageComponent } from "@views/management/components/master-page/master-page.component";
import { PassengersComponent } from "./modules/passengers/passengers.component";
import { SendRequestComponent } from "./modules/send-request/send-request.component";



const routes: Routes = [
  {
    path: "vip",
    component: MasterPageComponent,
    children: [
      { path: "requestsend", component: SendRequestComponent},
      { path: "passengers", component: PassengersComponent },
      { path: "", redirectTo: "passengers", pathMatch: "full" },
      { path: "**", redirectTo: "passengers" },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VipRoutingModule {}
