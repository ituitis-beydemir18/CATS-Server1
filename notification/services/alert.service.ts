import { Injectable } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { Observable } from "rxjs";
import {
  IMessage,
  MessageType,
} from "@shared/notification/components/alert/alert.model";
import { AlertComponent } from "@shared/notification/components/alert/alert.component";

@Injectable({
  providedIn: "root",
})
export class AlertService {
  constructor(public dialog: MatDialog) {}

  public dialogRef: MatDialogRef<AlertComponent>;

  private getMessage(message: IMessage | Observable<IMessage>) {
    return message instanceof Observable
      ? message
      : new Observable<IMessage>((observer) => {
          observer.next(message);
        });
  }

  show(
    message: IMessage | Observable<IMessage>,
    disableClose: boolean = false
  ) {
    this.closeDialog();
    return (this.dialogRef = this.dialog.open(AlertComponent, {
      disableClose: disableClose,
      data: this.getMessage(message),
    }));
  }

  info(title: string, subtitle: string) {
    return this.show(<IMessage>{
      title: title,
      subtitle: subtitle,
      type: MessageType.Information,
    });
  }

  success(title: string, subtitle: string) {
    return this.show(<IMessage>{
      title: title,
      subtitle: subtitle,
      type: MessageType.Success,
    });
  }

  error(title: string, subtitle: string, content: string = null) {
    return this.show(<IMessage>{
      title: title,
      subtitle: subtitle,
      content: content,
      type: MessageType.Error,
    });
  }

  confirm(title: string, content: string, allowComment: boolean = false) {
    return this.show(<IMessage>{
      title: title,
      content: content,
      type: MessageType.Confirm,
      allowComment: allowComment,
    });
  }

  preloader(title: string, content: string) {
    return this.show(
      <IMessage>{
        title: title,
        content: content,
        type: MessageType.Preloader,
      },
      true
    );
  }

  closeDialog(): void {
    if (this.dialogRef != null) {
      this.dialogRef.close();
    }
  }
}
