export interface IMessage {
  title: string,
  subtitle?: string,
  content?: string,
  type?: MessageType,
  allowComment?: boolean
}

export enum MessageType {
  Information = "info",
  Success = "success",
  Warning = "warning",
  Error = "error",
  Confirm = "confirm",
  Preloader = "preloader",
  CustomPreloader1 = "customPreloader1"
}
