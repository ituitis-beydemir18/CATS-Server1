import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ItemChipsAutocompleteComponent } from "./item-chips-autocomplete.component";

describe("ItemChipsAutocompleteComponent", () => {
  let component: ItemChipsAutocompleteComponent;
  let fixture: ComponentFixture<ItemChipsAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemChipsAutocompleteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemChipsAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
