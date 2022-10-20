import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { AlertService } from "@shared/notification/services/alert.service";
import { TranslateService } from "@ngx-translate/core";
import { Apollo, QueryRef } from "apollo-angular";
import { Observable, Subscription } from "rxjs";
import { UntypedFormControl, UntypedFormGroup, FormBuilder } from "@angular/forms";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import { AccountService } from "@core/authentication/account.service";

@Component({
  selector: "app-airport-selector",
  templateUrl: "./airport-selector.component.html",
  styleUrls: ["./airport-selector.component.scss"],
})
export class AirportSelectorComponent implements OnInit {
  loading: boolean = false;
  pageInfo: any;
  public me: Observable<any>;

  constructor(private router: Router,
    private translate: TranslateService,
    private account: AccountService,
    private apollo: Apollo,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<AirportSelectorComponent>
  ) {
    this.me = this.account.currentUser;
  }

  ngOnInit(): void { }

  get pageLoading(): boolean {
    return false;
  }

  onSelect(airport: any): void {
    this.dialogRef.close(airport);
  }
}
