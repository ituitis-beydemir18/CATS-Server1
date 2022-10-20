import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "@shared/material/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ItemSelectComponent } from "./item-select.component";
import { NgPipesModule } from "ngx-pipes";

@NgModule({
  declarations: [ItemSelectComponent],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule, NgPipesModule],
  exports: [ItemSelectComponent, NgPipesModule],
})
export class ItemSelectModule {}
