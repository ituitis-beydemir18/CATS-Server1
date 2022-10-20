import { Component, OnInit, Inject, Input } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AlertService } from "@shared/notification/services/alert.service";
import { TranslateService } from "@ngx-translate/core";
import { Subscription } from "rxjs";
import { Apollo } from "apollo-angular";
import { UntypedFormGroup, UntypedFormBuilder } from "@angular/forms";
import { map } from "rxjs/operators";
import {
  updateApplicationGQL,
  getApplicationGQL,
} from "./edit-application-dialog.graphql";

@Component({
  selector: "app-edit-application-dialog",
  templateUrl: "./edit-application-dialog.component.html",
  styleUrls: ["./edit-application-dialog.component.scss"],
})
export class EditApplicationDialogComponent implements OnInit {
  pageLoading: boolean = true;
  loading: boolean = false;
  application: any;
  applicationForm: UntypedFormGroup;
  subscription: Subscription;

  @Input() applicationId: number;

  constructor(
    public apollo: Apollo,
    private alert: AlertService,
    private translate: TranslateService,
    public fb: UntypedFormBuilder,
    public dialogRef: MatDialogRef<EditApplicationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public args: any
  ) {
    this.applicationId = this.args.applicationId;
    this.applicationForm = this._createForm();
  }

  ngOnInit() {
    if (this.applicationId) {
      this._initEditMode();
    } else {
      this.pageLoading = false;
    }
  }

  private _createForm(): UntypedFormGroup {
    return this.fb.group({
      id: null,
      name: "",
      typeId: null,
      groupName: "",
      iconUrl: "",
      pageUrl: "",
      rowIndex: null,
      roles: null,
      guestAccess: false,
    });
  }

  private _initEditMode(): void {
    this.subscription = this.apollo
      .query<any>({
        query: getApplicationGQL,
        variables: {
          id: this.applicationId,
        },
      })
      .pipe(
        map(({ data, loading }: any) => {
          let application = data.application;
          application.roles = application.roles?.map((x) => x.roleId);
          return application;
        })
      )
      .subscribe((application: any) => {
        this.application = application;
        this.applicationForm.patchValue(this.application);
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
              mutation: updateApplicationGQL,
              variables: { input: this.applicationForm.value },
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
