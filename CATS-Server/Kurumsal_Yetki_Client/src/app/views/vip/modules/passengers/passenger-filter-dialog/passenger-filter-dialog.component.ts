import { Component, Inject, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { TranslateService } from "@ngx-translate/core";
import { AlertService } from "@shared/notification/services/alert.service";
import { Apollo } from "apollo-angular";
import { Subscription } from "rxjs";
import * as moment from "moment";

@Component({
  selector: "app-passenger-filter-dialog",
  templateUrl: "./passenger-filter-dialog.component.html",
  styleUrls: ["./passenger-filter-dialog.component.scss"],
})
export class PassengerFilterDialogComponent implements OnInit {
  pageLoading: boolean = false;
  loading: boolean = false;
  defaultValues: any;
  filterForm: UntypedFormGroup;
  subscription: Subscription;

  constructor(
    public apollo: Apollo,
    private alert: AlertService,
    private translate: TranslateService,
    public fb: UntypedFormBuilder,
    public dialogRef: MatDialogRef<PassengerFilterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public args: any
  ) {}

  ngOnInit(): void {
    if (this.args.filters) {
      this.args.filters.status = this.args.filters.status
        ? [this.args.filters.status]
        : null;
      this.args.filters.typeId = this.args.filters.typeId
        ? [this.args.filters.typeId]
        : null;
      this.filterForm = this.fb.group(this.args.filters);
    }
  }

  reset(): void {
    this.filterForm.reset({
      flightStartDate: moment().set({
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0,
      }),
      flightEndDate: moment().set({
        hour: 23,
        minute: 59,
        second: 59,
        millisecond: 99,
      }),
    });
  }

  apply(): void {
    this.dialogRef.close(this.filterForm.value);
  }
}
