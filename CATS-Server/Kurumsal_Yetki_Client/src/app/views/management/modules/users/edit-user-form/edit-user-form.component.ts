import { Component, OnInit, Input, Inject } from "@angular/core";
import { AlertService } from "@shared/notification/services/alert.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { TranslateService } from "@ngx-translate/core";
import { Apollo } from "apollo-angular";
import {
  getUserGQL,
  deleteUserGQL,
  saveUserGQL,
} from "./edit-user-form.graphql";
import { map } from "rxjs/operators";
import { UntypedFormGroup, UntypedFormBuilder } from "@angular/forms";
import { Subscription } from "rxjs";

@Component({
  selector: "app-edit-user-form",
  templateUrl: "./edit-user-form.component.html",
  styleUrls: ["./edit-user-form.component.scss"],
})
export class EditUserFormComponent implements OnInit {
  loading: boolean = false;
  user: any;
  userForm: UntypedFormGroup;
  userSubscription: Subscription;

  @Input() userId: number;

  constructor(
    private apollo: Apollo,
    private alert: AlertService,
    private translate: TranslateService,
    public dialogRef: MatDialogRef<EditUserFormComponent>,
    public fb: UntypedFormBuilder,
    @Inject(MAT_DIALOG_DATA) public args: any
  ) {
    this.userId = this.args.id;
    this.userForm = this._createUserForm();
  }

  get pageLoading(): boolean {
    return !this.userForm || (this.userId && !this.userSubscription.closed);
  }

  ngOnInit(): void {
    this.userSubscription = this.userId
      ? this.apollo
          .query({
            query: getUserGQL,
            variables: { id: this.userId },
          })
          .pipe(
            map(({ data, loading }: any) => {
              this.loading = loading;
              let user = data.user;
              user.roles = user.roles?.map((x) => x.roleId);
              user.airports = user.airports?.map((x) => x.airportId);
              return user;
            })
          )
          .subscribe((user: any) => {
            this.userForm.patchValue(user);
            this.user = user;
          })
      : undefined;
  }

  private _createUserForm(): UntypedFormGroup {
    return this.fb.group({
      id: null,
      username: "",
      name: "",
      typeId: null,
      employeeId: "",
      jobTitle: "",
      email: "",
      languageId: null,
      airportId: null,
      locked: false,
      roles: null,
      airports: null,
    });
  }

  save(): void {
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
              mutation: saveUserGQL,
              variables: { input: this.userForm.value },
            })
            .subscribe((result: any) => {
              this.dialogRef.close(true);
            });
        }
      });
  }

  delete(): void {
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
              variables: { id: this.userId },
            })
            .subscribe((result: any) => {
              this.dialogRef.close(true);
            });
        }
      });
  }

  resetForm(): void {
    this.userForm.reset();
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
