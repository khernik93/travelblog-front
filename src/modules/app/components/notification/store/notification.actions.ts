import { Action } from '@ngrx/store';

export enum NotificationActionTypes {
  SetError = '[Notification] Set error',
  SetSuccess = '[Notification] Set success',
  CloseNotification = '[Notification] Close notification'
}

export class SetError implements Action {
  readonly type = NotificationActionTypes.SetError;

  constructor(public message: string) { }
}

export class SetSuccess implements Action {
  readonly type = NotificationActionTypes.SetSuccess;

  constructor(public message: string) { }
}

export class CloseNotification implements Action {
  readonly type = NotificationActionTypes.CloseNotification;

  constructor(public index: number) { }
}

export type NotificationActions = SetError
  | SetSuccess
  | CloseNotification;
