import {
  Component,
  ElementRef,
  ViewChild,
  Input,
  ViewEncapsulation,
  forwardRef,
} from "@angular/core";
import {
  UntypedFormControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from "@angular/forms";
import { Observable, of } from "rxjs";
import { map, distinctUntilChanged } from "rxjs/operators";
import { Apollo, QueryRef } from "apollo-angular";
import { findGQL, getGQL } from "./item-chips-autocomplete.graphql";

@Component({
  selector: "app-item-chips-autocomplete",
  templateUrl: "./item-chips-autocomplete.component.html",
  styleUrls: ["./item-chips-autocomplete.component.scss"],
  encapsulation: ViewEncapsulation.Emulated,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ItemChipsAutocompleteComponent),
      multi: true,
    },
  ],
})
export class ItemChipsAutocompleteComponent implements ControlValueAccessor {
  loading: boolean = false;
  items: Array<any> = [];
  inputCtrl: UntypedFormControl;
  findQueryRef: QueryRef<any>;
  filteredItems: Observable<Array<any>>;

  @Input() query: string;
  @Input() idField: string;
  @Input() nameField: string;
  @Input() itemCount: number;
  @Input() placeholder: string;
  @Input() _value: Array<any>;

  propagateChange = (_: any) => {};

  @ViewChild("searchInput") searchInput: ElementRef<HTMLInputElement>;

  constructor(private apollo: Apollo) {
    this.inputCtrl = new UntypedFormControl();
  }

  get value(): Array<any> {
    return this._value;
  }

  set value(value: Array<any>) {
    this._value = value;
    this.propagateChange(this._value);
  }

  ngOnInit(): void {
    this._initQueriesWithSubscriptions();
    this._initFormControls();
  }

  private _validateInitValue(): void {
    if (!this.value) return;
    this.loading = true;
    this.apollo
      .query<any>({
        query: getGQL(this.query, this.idField, this.nameField),
        variables: {
          values: this.value,
        },
      })
      .subscribe(({ data, loading }) => {
        this.loading = loading;
        this.items.push(...data.items.nodes);
        this.validateInput();
      });
  }

  private _initQueriesWithSubscriptions(): void {
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
  }

  private _initFormControls(): void {
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

  add(item: any): void {
    if (this.items.findIndex((x) => x.id == item.id) < 0) {
      this.items.push(item);
    }
    this.validateInput();
  }

  // WARN: chipListRemoveChanges event somehow doesn't fire
  // TODO: This method should be deprecated in the future
  remove(item: any): void {
    const index = this.items.indexOf(item);
    index >= 0 && this.items.splice(index, 1);
    this.validateInput();
  }

  // WARN: Input set value not working when both using Autocomplete and Chiplist
  // TODO: This method should be deprecated in the future
  validateInput(): void {
    this.searchInput.nativeElement.value = "";
    this.inputCtrl.setValue(null);
    this.value = this.items.map((x) => x.id);
  }

  // WARN: This function calls twice which is an Angular bug
  // TODO: Workaround solution is to existing value and leave the function
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

  registerOnTouched(): void {}
}
