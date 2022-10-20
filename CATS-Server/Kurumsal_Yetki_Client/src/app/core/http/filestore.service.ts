import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Subscriber } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class FilestoreService {
  constructor(private http: HttpClient) {}

  public getPassengersAsXls(filterInput: any) {
    return this.http.post(`/api/download/getPassengersAsXls`, filterInput, {
      observe: "response",
      responseType: "arraybuffer",
    });
  }

  public getPassengersAsPdf(filterInput: any) {
    return this.http.post(`/api/download/getPassengersAsPdf`, filterInput, {
      observe: "response",
      responseType: "arraybuffer",
    });
  }
}
