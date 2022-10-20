import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "@shared/material/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ItemChipsAutocompleteComponent } from "./item-chips-autocomplete.component";

@NgModule({
  declarations: [ItemChipsAutocompleteComponent],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  exports: [ItemChipsAutocompleteComponent],
})
export class ItemChipsAutocompleteModule {}
