import { Component, OnInit, Inject, Input } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { AlertService } from "@shared/notification/services/alert.service";
import { TranslateService } from "@ngx-translate/core";
import { Subscription } from "rxjs";
import { Apollo } from "apollo-angular";
import { UntypedFormGroup, UntypedFormBuilder } from "@angular/forms";
import { map } from "rxjs/operators";
import {
  updateAirportGQL,
  getAirportGQL,
} from "./edit-airport-dialog.graphql";

@Component({
  selector: "app-edit-airport-dialog",
  templateUrl: "./edit-airport-dialog.component.html",
  styleUrls: ["./edit-airport-dialog.component.scss"],
})
export class EditAirportDialogComponent implements OnInit {
  pageLoading: boolean = true;
  loading: boolean = false;
  airport: any;
  airportForm: UntypedFormGroup;
  subscription: Subscription;

  @Input() airportId: number;

  constructor(
    public apollo: Apollo,
    private alert: AlertService,
    private translate: TranslateService,
    public fb: UntypedFormBuilder,
    public dialogRef: MatDialogRef<EditAirportDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public args: any
  ) {
    this.airportId = this.args.airportId;
    this.airportForm = this._createForm();
  }

  ngOnInit() {
    if (this.airportId) {
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
      hasVip: false,
      isDomestic: false,
      locked: false
    });
  }

  private _initEditMode(): void {
    this.subscription = this.apollo
      .query<any>({
        query: getAirportGQL,
        variables: {
          id: this.airportId,
        },
      })
      .pipe(
        map(({ data, loading }: any) => {
          this.pageLoading = loading;
          return data.airport;
        })
      )
      .subscribe((airport: any) => {
        this.airport = airport;
        this.airportForm.patchValue(this.airport);
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
              mutation: updateAirportGQL,
              variables: { input: this.airportForm.value },
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
