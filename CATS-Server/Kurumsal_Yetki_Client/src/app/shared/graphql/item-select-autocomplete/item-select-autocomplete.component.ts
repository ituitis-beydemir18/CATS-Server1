import { Component, Input, ViewEncapsulation, forwardRef } from "@angular/core";
import { Apollo, QueryRef } from "apollo-angular";
import { Observable, of } from "rxjs";
import {
  UntypedFormControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from "@angular/forms";
import { distinctUntilChanged, map } from "rxjs/operators";
import { findGQL, getGQL } from "./item-select-autocomplete.graphql";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";

@Component({
  selector: "app-item-select-autocomplete",
  templateUrl: "./item-select-autocomplete.component.html",
  styleUrls: ["./item-select-autocomplete.component.scss"],
  encapsulation: ViewEncapsulation.Emulated,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ItemSelectAutocompleteComponent),
      multi: true,
    },
  ],
})
export class ItemSelectAutocompleteComponent implements ControlValueAccessor {
  loading: boolean = false;
  inputCtrl: UntypedFormControl;
  findQueryRef: QueryRef<any>;
  filteredItems: Observable<Array<any>>;

  @Input() query: string;
  @Input() idField: string;
  @Input() nameField: string;
  @Input() itemCount: number;
  @Input() placeholder: string;
  @Input() enableFreeText: boolean = false;

  @Input() _value: any;

  propagateChange = (_: any) => { };

  constructor(private apollo: Apollo) {
    this.inputCtrl = new UntypedFormControl();
  }

  get value(): any {
    return this._value;
  }

  set value(value: any) {
    if (typeof value === "object") {
      this._value = value?.id;
    }
    else {
      if (this.enableFreeText) {
        this._value = value;
      }
    }
    this.propagateChange(this._value);
  }

  ngOnInit(): void {
    this._initQueriesWithObservables();
  }

  private _validateInitValue(): void {
    if (!this.value || this.enableFreeText) {
      this.inputCtrl.setValue(this.value);
      return;
    }

    this.loading = true;
    this.apollo
      .query<any>({
        query: getGQL(this.query, this.idField, this.nameField),
        variables: {
          value: this.value,
        },
      })
      .subscribe(({ data, loading }) => {
        this.loading = loading;
        this.inputCtrl.setValue(data?.items?.nodes[0]);
      });
  }

  private _initQueriesWithObservables(): void {
    this.findQueryRef = this.apollo.watchQuery<any>({
      query: findGQL(this.query, this.idField, this.nameField),
      variables: {
        keyword: "",
        itemCount: this.itemCount,
      },
    });

    this.filteredItems = this.findQueryRef.valueChanges.pipe(
      map(({ data, loading }: any) => {
        this.loading = loading;
        return data.items.nodes;
      })
    );

    this.inputCtrl.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe((value) => {
        if (typeof value == "string") {
          return this.findQueryRef.refetch({ keyword: value });
        } else {
          return of(null);
        }
      });
  }

  optionSelected(event: MatAutocompleteSelectedEvent) {
    this.value = event.option.value?.id;
  }

  validateInput(): void {
    if (this.enableFreeText) {
      this.value = this.inputCtrl.value;
    }
    else {
      if (typeof this.inputCtrl.value === "string") {
        this.inputCtrl.setValue(null);
        this.value = null;
      }
    }
  }

  displayFn(item?: any): string | undefined {
    return typeof item === "string" ? item : item?.name;
  }

  // This function calls twice which is an Angular bug
  // Workaround solution is to existing value and leave the function
  writeValue(value: any) {
    if (this.inputCtrl && !value) {
      this.inputCtrl.reset();
    }
    this._value = value;
    this._validateInitValue();
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(): void { }
}
