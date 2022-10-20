import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ItemSelectModule } from "./item-select/item-select.module";
import { ItemSelectAutocompleteModule } from "./item-select-autocomplete/item-select-autocomplete.module";
import { ItemSelectMultipleModule } from "./item-select-multiple/item-select-multiple.module";
import { ItemSelectionListModule } from "./item-selection-list/item-selection-list.module";
import { ItemChipsAutocompleteModule } from "./item-chips-autocomplete/item-chips-autocomplete.module";

const graphqlModules = [
  ItemSelectModule,
  ItemSelectAutocompleteModule,
  ItemSelectMultipleModule,
  ItemSelectionListModule,
  ItemChipsAutocompleteModule,
];

@NgModule({
  imports: [...graphqlModules],
  exports: [...graphqlModules],
  declarations: [],
})
export class GraphqlModule {}
