import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { VipRoutingModule } from "./vip-routing.module";
import { SharedModule } from "@shared/shared.module";
import { PassengersModule } from "./modules/passengers/passengers.module";
import { SendRequestModule } from "./modules/send-request/send-request.module";



@NgModule({
  imports: [CommonModule, SharedModule, PassengersModule, VipRoutingModule, SendRequestModule ],
  declarations: [],
})
export class VipModule {}
