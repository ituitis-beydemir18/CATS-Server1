import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ItemSelectionListComponent } from "./item-selection-list.component";

describe("ItemSelectionListComponent", () => {
  let component: ItemSelectionListComponent;
  let fixture: ComponentFixture<ItemSelectionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemSelectionListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemSelectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
