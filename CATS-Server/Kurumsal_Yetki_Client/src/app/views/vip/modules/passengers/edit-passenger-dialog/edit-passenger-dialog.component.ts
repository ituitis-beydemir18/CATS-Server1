import { Component, OnInit, Inject, Input } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AlertService } from "@shared/notification/services/alert.service";
import { TranslateService } from "@ngx-translate/core";
import { Subscription } from "rxjs";
import { Apollo } from "apollo-angular";
import { UntypedFormGroup, UntypedFormBuilder } from "@angular/forms";
import { map } from "rxjs/operators";
import {
  updatePassengerGQL,
  getPassengerGQL,
} from "./edit-passenger-dialog.graphql";
import * as moment from "moment";
import { AccountService } from "@core/authentication/account.service";

@Component({
  selector: "app-edit-passenger-dialog",
  templateUrl: "./edit-passenger-dialog.component.html",
  styleUrls: ["./edit-passenger-dialog.component.scss"],
})
export class EditPassengerDialogComponent implements OnInit {
  pageLoading: boolean = true;
  loading: boolean = false;
  airport: any;
  passenger: any;
  passengerForm: UntypedFormGroup;
  subscription: Subscription;

  @Input() passengerId: number;

  constructor(
    public apollo: Apollo,
    private alert: AlertService,
    private translate: TranslateService,
    private account: AccountService,
    public fb: UntypedFormBuilder,
    public dialogRef: MatDialogRef<EditPassengerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public args: any
  ) {
    this.passengerId = this.args.passengerId;
    this.passengerForm = this._createForm();
  }

  ngOnInit() {
    if (this.passengerId) {
      this._initEditMode();
    } else {
      this.pageLoading = false;
    }

    // Get current account airport
    this.account.currentUser.subscribe(user => {
      this.airport = user.airport;
      this.passengerForm.patchValue({ airportCode: user.airport.code });
    });
  }

  private _createForm(): UntypedFormGroup {
    return this.fb.group({
      id: null,
      airportCode: "",
      name: "",
      surname: "",
      jobTitle: "",
      typeId: null,
      title: "",
      airlineCode: "",
      flightNumber: null,
      pnrNumber: "",
      flightFrom: "",
      flightTo: "",
      flightDate: moment(),
      departureDate: null,
      arrivalDate: null,
      status: null,
      assignedStaff: "",
      comments: "",
    });
  }

  private _initEditMode(): void {
    this.subscription = this.apollo
      .query<any>({
        query: getPassengerGQL,
        variables: {
          id: this.passengerId,
        },
      })
      .pipe(
        map(({ data, loading }: any) => {
          let passenger = data.passenger;
          passenger.roles = passenger.roles?.map((x) => x.roleId);
          return passenger;
        })
      )
      .subscribe((passenger: any) => {
        this.passenger = passenger;
        this.passengerForm.patchValue(this.passenger);
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
              mutation: updatePassengerGQL,
              variables: { input: this.passengerForm.value },
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
