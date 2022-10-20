import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { AlertService } from "@shared/notification/services/alert.service";
import { TranslateService } from "@ngx-translate/core";
import { Apollo, QueryRef } from "apollo-angular";
import { Observable, Subscription } from "rxjs";
import { UntypedFormControl, UntypedFormGroup, UntypedFormBuilder } from "@angular/forms";
import { map } from "rxjs/operators";
import { EditPassengerTypeDialogComponent } from "../edit-passenger-type-dialog/edit-passenger-type-dialog.component";
import { getAllPassengerTypesGQL } from "./manage-passenger-types.graphql";
import { deletePassengerTypeGQL } from "../edit-passenger-type-dialog/edit-passenger-type-dialog.graphql";

@Component({
  selector: "app-manage-passenger-types",
  templateUrl: "./manage-passenger-types.component.html",
  styleUrls: ["./manage-passenger-types.component.scss"],
})
export class ManagePassengerTypesComponent implements OnInit {
  loading: boolean = false;
  pageInfo: any;
  keyword: UntypedFormControl;
  filters: UntypedFormGroup;
  passengerTypes: Observable<any>;
  passengerTypesQuery: QueryRef<any>;
  passengerTypesSubscription: Subscription;
  dialogRef: any;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private apollo: Apollo,
    private alert: AlertService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private translate: TranslateService,
    private fb: UntypedFormBuilder
  ) {
    this.keyword = this.fb.control("");
    this.filters = this.fb.group({ keyword: this.keyword, name: [""] });
  }

  get pageLoading(): boolean {
    return !this.passengerTypes;
  }

  ngOnInit() {
    this.passengerTypesQuery = this.apollo.watchQuery({
      query: getAllPassengerTypesGQL,
      variables: { keyword: "" },
    });

    this.passengerTypes = this.passengerTypesQuery.valueChanges.pipe(
      map(({ data, loading }: any) => {
        this.loading = loading;
        return data.passengerTypes;
      })
    );
  }

  edit(passengerType: any = null): void {
    this.dialogRef = this.dialog
      .open(EditPassengerTypeDialogComponent, {
        hasBackdrop: true,
        data: { passengerTypeId: passengerType?.id },
        width: "500px",
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.passengerTypesQuery.refetch();
          this.showSnackBar(
            this.translate.instant("SaveSuccess.Title"),
            this.translate.instant("Ok")
          );
        }
      });
  }

  delete(passengerType: any) {
    this.alert
      .confirm(
        this.translate.instant("ConfirmDelete.Title"),
        this.translate.instant("ConfirmDelete.Subtitle")
      )
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.apollo
            .mutate({
              mutation: deletePassengerTypeGQL,
              variables: { id: passengerType.id },
            })
            .subscribe((result) => {
              this.passengerTypesQuery.refetch();
            });
        }
      });
  }

  filter(): void {
    this.paginator.firstPage();
    this.passengerTypesQuery.refetch({
      keyword: this.keyword.value,
      first: 50,
      after: null,
    });
  }

  clearSearchBox(): void {
    this.keyword.setValue("");
    this.passengerTypesQuery.refetch({ keyword: this.keyword.value });
  }

  refresh(): void {
    this.passengerTypesQuery.refetch();
  }

  showSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 1000,
    });
  }

  ngOnDestroy() {
    if (this.passengerTypesSubscription) {
      this.passengerTypesSubscription.unsubscribe();
    }
  }
}
