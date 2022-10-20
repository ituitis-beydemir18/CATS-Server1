import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { AlertService } from "@shared/notification/services/alert.service";
import { TranslateService } from "@ngx-translate/core";
import { Apollo, QueryRef } from "apollo-angular";
import { Observable, Subscription } from "rxjs";
import { EditUserFormComponent } from "../edit-user-form/edit-user-form.component";
import { allUsersGQL, deleteUserGQL } from "./manage-users.graphql";
import {
  UntypedFormControl,
  UntypedFormGroup,
  UntypedFormBuilder,
} from "@angular/forms";
import { map } from "rxjs/operators";

@Component({
  selector: "app-manage-users",
  templateUrl: "./manage-users.component.html",
  styleUrls: ["./manage-users.component.scss"],
})
export class ManageUsersComponent implements OnInit {
  loading: boolean = false;
  pageSize: number = 50;
  totalCount: number = 0;
  pageInfo: any;
  keyword: UntypedFormControl;
  filters: UntypedFormGroup;
  users: Observable<any>;
  usersQuery: QueryRef<any>;
  usersSubscription: Subscription;
  dialogRef: any;

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

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  ngOnInit() {
    this.usersQuery = this.apollo.watchQuery({
      query: allUsersGQL,
      variables: { keyword: "", first: this.pageSize, after: null },
    });

    this.users = this.usersQuery.valueChanges.pipe(
      map(({ data, loading }: any) => {
        this.loading = loading;
        this.totalCount = data.users.totalCount;
        this.pageInfo = data.users.pageInfo;
        return data.users.nodes;
      })
    );
  }

  get pageLoading(): boolean {
    return !this.users;
  }

  editUser(id: number = null): void {
    this.dialogRef = this.dialog
      .open(EditUserFormComponent, {
        hasBackdrop: true,
        width: "500px",
        data: { id: id },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.usersQuery.refetch();
          this.showSnackBar(
            this.translate.instant("SaveSuccess.Title"),
            this.translate.instant("OK")
          );
        }
      });
  }

  deleteUser(id: number): void {
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
              mutation: deleteUserGQL,
              variables: { id: id },
            })
            .subscribe((result: any) => {
              this.usersQuery.refetch();
            });
        }
      });
  }

  changePage(event: any) {
    let next = event == null || event?.previousPageIndex < event?.pageIndex;
    this.usersQuery.refetch({
      first: next ? this.pageSize : null,
      after: next ? this.pageInfo.endCursor : null,
      last: next ? null : this.pageSize,
      before: next ? null : this.pageInfo.startCursor,
    });
  }

  filterUsers(): void {
    this.paginator.firstPage();
    this.usersQuery.refetch({
      keyword: this.keyword.value,
      first: this.pageSize,
    });
  }

  clearSearchBox(): void {
    this.keyword.setValue("");
    this.usersQuery.refetch({ keyword: this.keyword.value });
  }

  refresh(): void {
    this.usersQuery.refetch();
  }

  showSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 1000,
    });
  }

  ngOnDestroy() {
    if (this.usersSubscription) {
      this.usersSubscription.unsubscribe();
    }
  }
}
