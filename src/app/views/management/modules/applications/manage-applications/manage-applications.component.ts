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
import { EditApplicationDialogComponent } from "../edit-application-dialog/edit-application-dialog.component";
import { getAllApplicationsGQL } from "./manage-applications.graphql";
import { deleteApplicationGQL } from "../edit-application-dialog/edit-application-dialog.graphql";

@Component({
  selector: "app-manage-applications",
  templateUrl: "./manage-applications.component.html",
  styleUrls: ["./manage-applications.component.scss"],
})
export class ManageApplicationsComponent implements OnInit {
  loading: boolean = false;
  pageInfo: any;
  keyword: UntypedFormControl;
  filters: UntypedFormGroup;
  applications: Observable<any>;
  applicationsQuery: QueryRef<any>;
  applicationsSubscription: Subscription;
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
    return !this.applications;
  }

  ngOnInit() {
    this.applicationsQuery = this.apollo.watchQuery({
      query: getAllApplicationsGQL,
      variables: { keyword: "" },
    });

    this.applications = this.applicationsQuery.valueChanges.pipe(
      map(({ data, loading }: any) => {
        this.loading = loading;
        return data.applications;
      })
    );
  }

  edit(id: number = null): void {
    this.dialogRef = this.dialog
      .open(EditApplicationDialogComponent, {
        hasBackdrop: true,
        maxWidth: 600,
        maxHeight: 1000,
        data: { applicationId: id },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.applicationsQuery.refetch();
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
              mutation: deleteApplicationGQL,
              variables: { id: id },
            })
            .subscribe((result) => {
              this.applicationsQuery.refetch();
            });
        }
      });
  }

  filter(): void {
    this.paginator.firstPage();
    this.applicationsQuery.refetch({
      keyword: this.keyword.value,
      first: 50,
      after: null,
    });
  }

  clearSearchBox(): void {
    this.keyword.setValue("");
    this.applicationsQuery.refetch({ keyword: this.keyword.value });
  }

  refresh(): void {
    this.applicationsQuery.refetch();
  }

  showSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 1000,
    });
  }

  ngOnDestroy() {
    if (this.applicationsSubscription) {
      this.applicationsSubscription.unsubscribe();
    }
  }
}
