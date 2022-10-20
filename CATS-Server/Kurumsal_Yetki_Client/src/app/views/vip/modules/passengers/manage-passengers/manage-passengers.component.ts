import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { AlertService } from "@shared/notification/services/alert.service";
import { TranslateService } from "@ngx-translate/core";
import { Apollo, QueryRef } from "apollo-angular";
import { Observable, Subscription } from "rxjs";
import {
  UntypedFormControl,
  UntypedFormGroup,
  UntypedFormBuilder,
} from "@angular/forms";
import { map } from "rxjs/operators";
import { EditPassengerDialogComponent } from "../edit-passenger-dialog/edit-passenger-dialog.component";
import { getAllPassengersGQL, syncPassengersGQL } from "./manage-passengers.graphql";
import { deletePassengerGQL } from "../edit-passenger-dialog/edit-passenger-dialog.graphql";
import { PassengerFilterDialogComponent } from "../passenger-filter-dialog/passenger-filter-dialog.component";
import * as moment from "moment";
import { FilestoreService } from "@core/http/filestore.service";
import { FileSaverService } from "@core/services/file-saver.service";
import { AccountService } from "@core/authentication/account.service";

@Component({
  selector: "app-manage-passengers",
  templateUrl: "./manage-passengers.component.html",
  styleUrls: ["./manage-passengers.component.scss"],
})
export class ManagePassengersComponent implements OnInit {
  loading: boolean = false;
  syncLoading: boolean = false;
  pageSize: number = 50;
  totalCount: number = 0;
  pageInfo: any;
  airport: any;
  keyword: UntypedFormControl;
  filterInput: any;
  passengers: Observable<any>;
  passengersQuery: QueryRef<any>;
  passengersSubscription: Subscription;
  dialogRef: any;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private apollo: Apollo,
    private alert: AlertService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private translate: TranslateService,
    private fb: UntypedFormBuilder,
    private fileStore: FilestoreService,
    private fileSaver: FileSaverService,
    private account: AccountService,

  ) {
    this.keyword = this.fb.control("");
  }

  get pageLoading(): boolean {
    return !this.passengers;
  }

  ngOnInit() {
    this.filterInput = {
      airportCode: null,
      name: null,
      surname: null,
      typeId: null,
      airlineCode: null,
      flightNumber: null,
      pnrNumber: null,
      flightFrom: null,
      flightTo: null,
      flightStartDate: moment().set({
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0,
      }),
      flightEndDate: moment().set({
        hour: 23,
        minute: 59,
        second: 59,
        millisecond: 99,
      }),
      staffAssigned: null,
      assignedStaff: null,
      status: null,
    };

    this.passengersQuery = this.apollo.watchQuery({
      query: getAllPassengersGQL,
      variables: { filters: this.filterInput },
    });

    this.passengers = this.passengersQuery.valueChanges.pipe(
      map(({ data, loading }: any) => {
        this.loading = loading;
        this.totalCount = data.passengers?.totalCount;
        this.pageInfo = data.passengers?.pageInfo;
        return data.passengers?.nodes;
      })
    );

    this.account.currentUser.subscribe(user => {
      if (user) {
        this.airport = user.airport;
        this.filterInput.airportCode = this.airport.code;
        this.passengersQuery.refetch();
      }
    });
  }

  edit(id: number = null): void {
    this.dialogRef = this.dialog
      .open(EditPassengerDialogComponent, {
        hasBackdrop: true,
        maxWidth: 500,
        maxHeight: 1000,
        data: { passengerId: id },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.passengersQuery.refetch();
          this.showSnackBar(
            this.translate.instant("SaveSuccess.Title"),
            this.translate.instant("Ok")
          );
        }
      });
  }

  delete(id: number) {
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
              mutation: deletePassengerGQL,
              variables: { id: id },
            })
            .subscribe((result) => {
              this.passengersQuery.refetch();
            });
        }
      });
  }

  filter(): void {
    this.paginator.firstPage();
    this.passengersQuery.refetch({
      keyword: this.keyword.value,
      first: this.pageSize,
    });
  }

  advancedSearch(): void {
    this.dialogRef = this.dialog
      .open(PassengerFilterDialogComponent, {
        hasBackdrop: true,
        maxWidth: 500,
        maxHeight: 1000,
        data: {
          filters: this.filterInput,
        },
      })
      .afterClosed()
      .subscribe((result: UntypedFormGroup) => {
        if (result) {
          this.filterInput = result;
          this.passengersQuery.refetch({ filters: this.filterInput });
        }
      });
  }

  download(type: string): void {
    let service =
      type == "pdf"
        ? this.fileStore.getPassengersAsPdf(this.filterInput)
        : this.fileStore.getPassengersAsXls(this.filterInput);

    service.subscribe((result: any) => {
      this.fileSaver.saveFile(result);
    });
  }

  clearSearchBox(): void {
    this.keyword.setValue("");
    this.passengersQuery.refetch({ keyword: this.keyword.value });
  }

  refresh(): void {
    this.passengersQuery.refetch();
  }

  sync(): void {
    if (this.airport) {
      this.syncLoading = true;
      this.apollo
        .mutate({
          mutation: syncPassengersGQL,
          variables: { airportId: this.airport.id },
        })
        .subscribe((result) => {
          this.syncLoading = false;
          this.refresh();
        },
          (error: any) => {
            this.syncLoading = false;
          });
    }
  }

  showSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 1000,
    });
  }

  ngOnDestroy() {
    if (this.passengersSubscription) {
      this.passengersSubscription.unsubscribe();
    }
  }
}
