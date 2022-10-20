import {
  Component,
  OnInit,
  Inject,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AlertService } from "@shared/notification/services/alert.service";
import { TranslateService } from "@ngx-translate/core";
import { Subscription } from "rxjs";
import { Apollo } from "apollo-angular";
import { UntypedFormGroup, UntypedFormBuilder } from "@angular/forms";
import { map } from "rxjs/operators";
import {
  saveLanguageGQL,
  deleteLanguageGQL,
  getLanguageGQL,
} from "./edit-language-form.graphql";

@Component({
  selector: "app-edit-language-form",
  templateUrl: "./edit-language-form.component.html",
  styleUrls: ["./edit-language-form.component.scss"],
})
export class EditLanguageFormComponent implements OnInit {
  pageLoading: boolean = true;
  loading: boolean = false;
  language: any;
  languageForm: UntypedFormGroup;
  subscription: Subscription;

  @Input() languageId: number;
  @Output() changed = new EventEmitter<boolean>();

  constructor(
    public apollo: Apollo,
    private alert: AlertService,
    private translate: TranslateService,
    public fb: UntypedFormBuilder
  ) {
    this.languageForm = this._createForm();
  }

  ngOnInit() {
    if (this.languageId) {
      this._initEditMode();
    } else {
      this.pageLoading = false;
    }
  }

  private _createForm(): UntypedFormGroup {
    return this.fb.group({
      id: null,
      name: "",
      code: "",
    });
  }

  private _initEditMode(): void {
    this.subscription = this.apollo
      .query<any>({
        query: getLanguageGQL,
        variables: {
          id: this.languageId,
        },
      })
      .pipe(
        map(({ data, loading }: any) => {
          this.pageLoading = loading;
          return data.translation;
        })
      )
      .subscribe((language: any) => {
        this.language = language;
        this.languageForm.patchValue(this.language);
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
              mutation: saveLanguageGQL,
              variables: { input: this.languageForm.value },
            })
            .subscribe((result) => {
              this.changed.emit(true);
            });
        }
      });
  }

  cancel() {
    this.changed.emit(false);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
