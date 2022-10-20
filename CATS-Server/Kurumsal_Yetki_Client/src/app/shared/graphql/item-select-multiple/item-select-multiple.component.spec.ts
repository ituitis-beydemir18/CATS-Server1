import { ComponentFixture, TestBed } from "@angular/core/testing";

import { ItemSelectMultipleComponent } from "./item-select-multiple.component";

describe("ItemSelectMultipleComponent", () => {
  let component: ItemSelectMultipleComponent;
  let fixture: ComponentFixture<ItemSelectMultipleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemSelectMultipleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemSelectMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
