import { Component, OnInit, Inject, Input } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AlertService } from "@shared/notification/services/alert.service";
import { TranslateService } from "@ngx-translate/core";
import { Subscription } from "rxjs";
import { Apollo } from "apollo-angular";
import { UntypedFormGroup, UntypedFormBuilder } from "@angular/forms";
import { map } from "rxjs/operators";
import {
  saveTranslationGQL,
  deleteTranslationGQL,
  getTranslationGQL,
} from "./edit-translation-dialog.graphql";

@Component({
  selector: "app-edit-translation-dialog",
  templateUrl: "./edit-translation-dialog.component.html",
  styleUrls: ["./edit-translation-dialog.component.scss"],
})
export class EditTranslationDialogComponent implements OnInit {
  pageLoading: boolean = true;
  loading: boolean = false;
  translation: any;
  translationForm: UntypedFormGroup;
  subscription: Subscription;

  @Input() translationId: number;

  constructor(
    public apollo: Apollo,
    private alert: AlertService,
    private translate: TranslateService,
    public fb: UntypedFormBuilder,
    public dialogRef: MatDialogRef<EditTranslationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public args: any
  ) {
    this.translationId = this.args.translationId;
    this.translationForm = this._createForm();
  }

  ngOnInit() {
    if (this.translationId) {
      this._initEditMode();
    } else {
      this.pageLoading = false;
    }
  }

  private _createForm(): UntypedFormGroup {
    return this.fb.group({
      id: null,
      languageCode: "",
      key: "",
      value: "",
    });
  }

  private _initEditMode(): void {
    this.subscription = this.apollo
      .query<any>({
        query: getTranslationGQL,
        variables: {
          id: this.translationId,
        },
      })
      .pipe(
        map(({ data, loading }: any) => {
          this.pageLoading = loading;
          return data.translation;
        })
      )
      .subscribe((translation: any) => {
        this.translation = translation;
        this.translationForm.patchValue(this.translation);
        this.pageLoading = false;
      });
  }

  save() {
    this.alert
      .confirm(
        this.translate.instant("ConfirmUpdate.Title"),
        this.translate.instant("ConfirmUpdate.Subtitle")
      )
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.apollo
            .mutate({
              mutation: saveTranslationGQL,
              variables: { input: this.translationForm.value },
            })
            .subscribe((result) => {
              this.dialogRef.close(true);
            });
        }
      });
  }

  delete() {
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
              variables: { id: this.translationId },
            })
            .subscribe((result) => {
              this.dialogRef.close(true);
            });
        }
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
