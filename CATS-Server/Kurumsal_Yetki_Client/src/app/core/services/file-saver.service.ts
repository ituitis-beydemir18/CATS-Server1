import { Injectable } from "@angular/core";
import { HttpResponse } from "@angular/common/http";
import { saveAs } from "file-saver";

@Injectable({
  providedIn: "root",
})
export class FileSaverService {
  constructor() {}

  /**
   * Derives file name from the http response
   * by looking inside content-disposition and saves the file automatically
   * @param response http Response
   */
  public saveFile(res: HttpResponse<ArrayBuffer>) {
    const contentDisposition = res.headers.get("content-disposition") || "";
    const matches = /filename=([^;]+)/gi.exec(contentDisposition);
    const fileName = (matches[1] || "untitled").trim();
    const blob = new Blob([res.body], {
      type: res.headers.get("content-type"),
    });
    saveAs(blob, fileName);
  }

  /**
   * Derives file name from the http response
   * by looking inside content-disposition and saves the file automatically
   * @param response http Response
   */
  public viewFile(res: HttpResponse<ArrayBuffer>) {
    const blob = new Blob([res.body], {
      type: res.headers.get("content-type"),
    });
    var fileURL = URL.createObjectURL(blob);
    window.open(fileURL);
  }
}
