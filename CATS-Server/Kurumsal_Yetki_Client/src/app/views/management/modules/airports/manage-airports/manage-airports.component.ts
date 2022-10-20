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
import { EditAirportDialogComponent } from "../edit-airport-dialog/edit-airport-dialog.component";
import { getAllAirportsGQL } from "./manage-airports.graphql";
import { deleteAirportGQL } from "../edit-airport-dialog/edit-airport-dialog.graphql";

@Component({
  selector: "app-manage-airports",
  templateUrl: "./manage-airports.component.html",
  styleUrls: ["./manage-airports.component.scss"],
})
export class ManageAirportsComponent implements OnInit {
  loading: boolean = false;
  pageInfo: any;
  keyword: UntypedFormControl;
  filters: UntypedFormGroup;
  airports: Observable<any>;
  airportsQuery: QueryRef<any>;
  airportsSubscription: Subscription;
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
    return !this.airports;
  }

  ngOnInit() {
    this.airportsQuery = this.apollo.watchQuery({
      query: getAllAirportsGQL,
      variables: { keyword: "" },
    });

    this.airports = this.airportsQuery.valueChanges.pipe(
      map(({ data, loading }: any) => {
        this.loading = loading;
        return data.airports;
      })
    );
  }

  edit(airport: any = null): void {
    this.dialogRef = this.dialog
      .open(EditAirportDialogComponent, {
        hasBackdrop: true,
        data: { airportId: airport?.id },
        width: "500px",
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.airportsQuery.refetch();
          this.showSnackBar(
            this.translate.instant("SaveSuccess.Title"),
            this.translate.instant("Ok")
          );
        }
      });
  }

  delete(airport: any) {
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
              mutation: deleteAirportGQL,
              variables: { id: airport.id },
            })
            .subscribe((result) => {
              this.airportsQuery.refetch();
            });
        }
      });
  }

  filter(): void {
    this.paginator.firstPage();
    this.airportsQuery.refetch({
      keyword: this.keyword.value,
      first: 50,
      after: null,
    });
  }

  clearSearchBox(): void {
    this.keyword.setValue("");
    this.airportsQuery.refetch({ keyword: this.keyword.value });
  }

  refresh(): void {
    this.airportsQuery.refetch();
  }

  showSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 1000,
    });
  }

  ngOnDestroy() {
    if (this.airportsSubscription) {
      this.airportsSubscription.unsubscribe();
    }
  }
}
