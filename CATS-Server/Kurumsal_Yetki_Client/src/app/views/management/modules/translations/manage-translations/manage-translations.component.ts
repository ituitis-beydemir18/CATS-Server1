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
import { EditTranslationDialogComponent } from "../edit-translation-dialog/edit-translation-dialog.component";
import { getAllTranslationsGQL } from "./manage-translations.graphql";
import { deleteTranslationGQL } from "../edit-translation-dialog/edit-translation-dialog.graphql";
import { ManageLanguagesDialogComponent } from "../manage-languages-dialog/manage-languages-dialog.component";

@Component({
  selector: "app-manage-translations",
  templateUrl: "./manage-translations.component.html",
  styleUrls: ["./manage-translations.component.scss"],
})
export class ManageTranslationsComponent implements OnInit {
  loading: boolean = false;
  pageSize: number = 50;
  totalCount: number = 0;
  pageInfo: any;
  keyword: UntypedFormControl;
  filters: UntypedFormGroup;
  translations: Observable<any>;
  translationsQuery: QueryRef<any>;
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
    return !this.translations;
  }

  ngOnInit() {
    this.translationsQuery = this.apollo.watchQuery({
      query: getAllTranslationsGQL,
      variables: {
        keyword: "",
        first: 50,
      },
    });

    this.translations = this.translationsQuery.valueChanges.pipe(
      map(({ data, loading }: any) => {
        this.loading = loading;
        this.totalCount = data.translations.totalCount;
        this.pageInfo = data.translations.pageInfo;
        return data.translations.nodes;
      })
    );
  }

  edit(translation: any = null): void {
    this.dialogRef = this.dialog
      .open(EditTranslationDialogComponent, {
        hasBackdrop: true,
        maxWidth: 600,
        maxHeight: 1000,
        data: { translationId: translation?.id },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.translationsQuery.refetch();
          this.showSnackBar(
            this.translate.instant("SaveSuccess.Title"),
            this.translate.instant("Ok")
          );
        }
      });
  }

  delete(translation: any) {
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
              mutation: deleteTranslationGQL,
              variables: { id: translation.id },
            })
            .subscribe((result) => {
              this.translationsQuery.refetch();
            });
        }
      });
  }

  manageLanguages() {
    this.dialogRef = this.dialog
      .open(ManageLanguagesDialogComponent, {
        hasBackdrop: true,
        maxWidth: 600,
        maxHeight: 1000,
        panelClass: "zero-padding",
      })
      .afterClosed()
      .subscribe((result) => {
        this.translationsQuery.refetch();
      });
  }

  changePage(event: any) {
    let next = event == null || event?.previousPageIndex < event?.pageIndex;
    this.translationsQuery.refetch({
      first: next ? this.pageSize : null,
      after: next ? this.pageInfo.endCursor : null,
      last: next ? null : this.pageSize,
      before: next ? null : this.pageInfo.startCursor,
    });
  }

  filter(): void {
    this.paginator.firstPage();
    this.translationsQuery.refetch({
      keyword: this.keyword.value,
      first: 50,
    });
  }

  clearSearchBox(): void {
    this.keyword.setValue("");
    this.translationsQuery.refetch({ keyword: this.keyword.value });
  }

  refresh(): void {
    this.translationsQuery.refetch();
  }

  showSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 1000,
    });
  }
}
