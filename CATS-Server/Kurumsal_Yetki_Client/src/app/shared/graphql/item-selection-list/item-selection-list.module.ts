import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "@shared/material/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ItemSelectionListComponent } from "./item-selection-list.component";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [ItemSelectionListComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  exports: [ItemSelectionListComponent],
})
export class ItemSelectionListModule {}
