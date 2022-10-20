import { Component, Input, ViewEncapsulation, forwardRef } from "@angular/core";
import {
  UntypedFormControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from "@angular/forms";
import { Apollo } from "apollo-angular";
import { Observable } from "rxjs";
import { findGQL } from "./item-selection-list.graphql";
import { map } from "rxjs/operators";

@Component({
  selector: "app-item-selection-list",
  templateUrl: "./item-selection-list.component.html",
  styleUrls: ["./item-selection-list.component.scss"],
  encapsulation: ViewEncapsulation.Emulated,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ItemSelectionListComponent),
      multi: true,
    },
  ],
})
export class ItemSelectionListComponent implements ControlValueAccessor {
  loading: boolean = false;
  items: Observable<any>;
  listCtrl: UntypedFormControl;

  @Input() query: string;
  @Input() idField: string;
  @Input() nameField: string;
  @Input() descriptionField: string;
  @Input() multiple: boolean = true;

  propagateChange = (_: any) => {};

  constructor(private apollo: Apollo) {
    this.listCtrl = new UntypedFormControl();
  }

  ngOnInit(): void {
    this.items = this.apollo
      .query<any>({
        query: findGQL(
          this.query,
          this.idField,
          this.nameField,
          this.descriptionField
        ),
      })
      .pipe(map((value: any) => value.data.items));

    this.listCtrl.valueChanges.subscribe((value) => {
      this.propagateChange(value);
    });
  }

  get value(): Array<any> {
    return this.listCtrl.value;
  }

  set value(value: Array<any>) {
    this.listCtrl.setValue(value);
    this.propagateChange(this.listCtrl.value);
  }

  writeValue(value: any) {

    
    if (this.value) return;
    this.listCtrl.setValue(value);
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(): void {}
}
