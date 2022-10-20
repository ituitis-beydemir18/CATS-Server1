import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ItemSelectAutocompleteComponent } from "./item-select-autocomplete.component";

describe("ItemSelectAutocompleteComponent", () => {
  let component: ItemSelectAutocompleteComponent;
  let fixture: ComponentFixture<ItemSelectAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemSelectAutocompleteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemSelectAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
