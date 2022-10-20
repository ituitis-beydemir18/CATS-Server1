import { Component, OnInit, Inject, Input } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AlertService } from "@shared/notification/services/alert.service";
import { TranslateService } from "@ngx-translate/core";
import { Subscription } from "rxjs";
import { Apollo } from "apollo-angular";
import { UntypedFormGroup, UntypedFormBuilder } from "@angular/forms";
import { map } from "rxjs/operators";
import {
  updatePassengerTypeGQL,
  getPassengerTypeGQL,
} from "./edit-passenger-type-dialog.graphql";

@Component({
  selector: "app-edit-passenger-type-dialog",
  templateUrl: "./edit-passenger-type-dialog.component.html",
  styleUrls: ["./edit-passenger-type-dialog.component.scss"],
})
export class EditPassengerTypeDialogComponent implements OnInit {
  pageLoading: boolean = true;
  loading: boolean = false;
  passengerType: any;
  passengerTypeForm: UntypedFormGroup;
  subscription: Subscription;

  @Input() passengerTypeId: number;

  constructor(
    public apollo: Apollo,
    private alert: AlertService,
    private translate: TranslateService,
    public fb: UntypedFormBuilder,
    public dialogRef: MatDialogRef<EditPassengerTypeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public args: any
  ) {
    this.passengerTypeId = this.args.passengerTypeId;
    this.passengerTypeForm = this._createForm();
  }

  ngOnInit() {
    if (this.passengerTypeId) {
      this._initEditMode();
    } else {
      this.pageLoading = false;
    }
  }

  private _createForm(): UntypedFormGroup {
    return this.fb.group({
      id: null,
      name: "",
      groupName: "",
    });
  }

  private _initEditMode(): void {
    this.subscription = this.apollo
      .query<any>({
        query: getPassengerTypeGQL,
        variables: {
          id: this.passengerTypeId,
        },
      })
      .pipe(
        map(({ data, loading }: any) => {
          this.pageLoading = loading;
          return data.passengerType;
        })
      )
      .subscribe((passengerType: any) => {
        this.passengerType = passengerType;
        this.passengerTypeForm.patchValue(this.passengerType);
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
              mutation: updatePassengerTypeGQL,
              variables: { input: this.passengerTypeForm.value },
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
