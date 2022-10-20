import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "@shared/material/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ItemSelectMultipleComponent } from "./item-select-multiple.component";
import { NgPipesModule } from "ngx-pipes";

@NgModule({
  declarations: [ItemSelectMultipleComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgPipesModule,
  ],
  exports: [ItemSelectMultipleComponent, NgPipesModule],
})
export class ItemSelectMultipleModule {}
