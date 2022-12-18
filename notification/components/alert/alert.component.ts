import { Component, OnInit, Inject, Input, Output } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Observable } from "rxjs";
import { IMessage } from "@shared/notification/components/alert/alert.model";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-alert",
  templateUrl: "./alert.component.html",
  styleUrls: ["./alert.component.scss"],
})
export class AlertComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Observable<IMessage>,
    translate: TranslateService
  ) {}

  @Input() title: string;
  @Input() subtitle: string;
  @Input() content: string;
  @Input() icon: string;
  @Input() buttons: string;
  @Input() color: string;
  @Input() preloader: string;
  @Input() allowComment: boolean;
  @Output() comments: string;

  readonly configs: { [type: string]: any } = {
    success: {
      color: "primary",
      icon: "done_all",
      buttons: "OK",
    },
    error: {
      icon: "error",
      buttons: "OK",
    },
    info: {
      color: "accent",
      icon: "info",
      buttons: "OK",
    },
    confirm: {
      color: "accent",
      icon: "help",
      buttons: "YesCancel",
    },
    preloader: {
      color: "primary",
      preloader: "spinner",
    },
    customPreloader1: {
      color: "accent",
      preloader: "custom-preloader-1",
    },
  };

  ngOnInit() {
    this.data.subscribe((res) => {
      let config = this.configs[res.type];
      this.title = res.title;
      this.subtitle = res.subtitle;
      this.content = res.content;
      this.icon = config.icon;
      this.buttons = config.buttons;
      this.color = config.color;
      this.preloader = config.preloader;
      this.allowComment = res.allowComment;
    });
  }
}
