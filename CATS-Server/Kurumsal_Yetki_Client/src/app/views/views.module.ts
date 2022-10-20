import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "@shared/shared.module";
import { ManagementModule } from "./management/management.module";
import { VipModule } from "./vip/vip.module";

@NgModule({
  imports: [CommonModule, SharedModule, ManagementModule, VipModule],
  providers: [],
  exports: [],
  declarations: [],
})
export class ViewsModule {}
