import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ItemSelectAutocompleteComponent } from "./item-select-autocomplete.component";
import { MaterialModule } from "@shared/material/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [ItemSelectAutocompleteComponent],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  exports: [ItemSelectAutocompleteComponent],
})
export class ItemSelectAutocompleteModule {}
