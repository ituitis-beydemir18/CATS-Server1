import { Component, OnInit, Inject, Input } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AlertService } from "@shared/notification/services/alert.service";
import { TranslateService } from "@ngx-translate/core";
import { Observable, Subscription } from "rxjs";
import { Apollo, QueryRef } from "apollo-angular";
import { FormGroup, UntypedFormBuilder } from "@angular/forms";
import { map } from "rxjs/operators";
import {
  saveLanguageGQL,
  deleteLanguageGQL,
  getLanguageGQL,
  getAllLanguages,
} from "./manage-languages-dialog.graphql";

enum States {
  init,
  newLanguage,
}

@Component({
  selector: "app-manage-languages-dialog",
  templateUrl: "./manage-languages-dialog.component.html",
  styleUrls: ["./manage-languages-dialog.component.scss"],
})
export class ManageLanguagesDialogComponent implements OnInit {
  pageLoading: boolean = true;
  loading: boolean = false;
  state: States = States.init;
  States = States;
  languages: Observable<any>;
  languagesQuery: QueryRef<any>;

  constructor(
    public apollo: Apollo,
    private alert: AlertService,
    private translate: TranslateService,
    public fb: UntypedFormBuilder,
    public dialogRef: MatDialogRef<ManageLanguagesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public args: any
  ) {}

  ngOnInit() {
    this.languagesQuery = this.apollo.watchQuery({
      query: getAllLanguages,
    });

    this.languages = this.languagesQuery.valueChanges.pipe(
      map(({ data, loading }: any) => {
        this.loading = loading;
        return data.languages;
      })
    );
  }

  delete(language: any) {
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
              mutation: deleteLanguageGQL,
              variables: { id: language.id },
            })
            .subscribe((result) => {
              this.languagesQuery.refetch();
            });
        }
      });
  }

  editLanguageFormChanged(refetchData: boolean = false): void {
    if (refetchData) {
      this.languagesQuery.refetch().then(() => (this.state = States.init));
    } else {
      this.state = States.init;
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
