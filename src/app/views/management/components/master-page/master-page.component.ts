import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { TranslateService } from "@ngx-translate/core";
import { Apollo } from "apollo-angular";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { getAllLanguagesGQL } from "./master-page.graphql";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AccountService } from "@core/authentication/account.service";
import { AirportSelectorComponent } from "../airport-selector/airport-selector.component";
import { AlertService } from "@shared/notification/services/alert.service";

@Component({
  selector: "app-master-page",
  templateUrl: "./master-page.component.html",
  styleUrls: ["./master-page.component.scss"],
})
export class MasterPageComponent implements OnInit {
  public loading: boolean = false;
  public search: boolean = false;
  public dialogRef: any;
  public me: Observable<any>;
  public currentStation: Observable<any>;
  public languages: Observable<any>;

  constructor(
    private router: Router,
    private translate: TranslateService,
    private account: AccountService,
    private apollo: Apollo,
    private dialog: MatDialog,
    private alert: AlertService,
    private snackBar: MatSnackBar
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.me = this.account.currentUser;
  }

  ngOnInit() {
    this.languages = this.apollo
      .query({
        query: getAllLanguagesGQL,
      })
      .pipe(
        map(({ data, loading }: any) => {
          return data.languages;
        })
      );
  }

  switchLanguage(language: any): void {
    this.translate.use(language.code);
    this.account.savePreferences({ languageId: language.id });
  }

  /*switchAirport(): void {
    this.dialog
      .open(AirportSelectorComponent, {
        hasBackdrop: true,
        panelClass: "card-dialog-container",
        data: {},
      })
      .afterClosed()
      .subscribe((airport: any) => {

        if (airport) {
          this.account.savePreferences({ airportId: airport.id });
        }
      });
  }*/

  showSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 1000,
    });
  }

  requestSupport(): void {
    this.alert.info(this.translate.instant("Need Support?"), this.translate.instant("{Support Details}"));
  }

  reloadPage(): void {
    let currentUrl = this.router.url;
    this.router
      .navigateByUrl("account", { skipLocationChange: true })
      .then(() => {
        this.router.navigate([currentUrl]);
      });
  }

  homePage(): void {
    window.location.assign("./");
  }

  logout(): void {
    window.location.assign("./logout");
  }
}
