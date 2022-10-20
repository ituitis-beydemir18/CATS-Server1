import { Component, Input, forwardRef } from "@angular/core";
import {
  UntypedFormControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from "@angular/forms";
import { Apollo } from "apollo-angular";
import { Observable } from "rxjs";
import { findGQL } from "./item-select.graphql";
import { map } from "rxjs/operators";

@Component({
  selector: "app-item-select",
  templateUrl: "./item-select.component.html",
  styleUrls: ["./item-select.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ItemSelectComponent),
      multi: true,
    },
  ],
})
export class ItemSelectComponent implements ControlValueAccessor {
  loading: boolean = false;
  items: Observable<any>;
  selectCtrl: UntypedFormControl;

  @Input() placeholder: string;
  @Input() query: string;
  @Input() idField: string;
  @Input() nameField: string;
  @Input() groupField: string;
  @Input() pagingEnabled: boolean = false;

  propagateChange = (_: any) => {};

  constructor(private apollo: Apollo) {
    this.selectCtrl = new UntypedFormControl();
  }

  ngOnInit() {
    this.items = this.apollo
      .query<any>({
        query: findGQL(
          this.query,
          this.idField,
          this.nameField,
          this.groupField,
          this.pagingEnabled
        ),
      })
      .pipe(
        map((value: any) => {
          return this.pagingEnabled
            ? value.data?.items?.nodes
            : value.data?.items;
        })
      );

    this.selectCtrl.valueChanges.subscribe((value) => {
      this.propagateChange(value);
    });
  }

  get value(): any {
    return this.selectCtrl.value;
  }

  set value(value: any) {
    this.selectCtrl.setValue(value);
    this.propagateChange(this.selectCtrl.value);
  }

  writeValue(value: any) {
    if (this.selectCtrl && !value) {
      this.selectCtrl.reset();
    }
    this.selectCtrl.setValue(value);
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(): void {}
}
