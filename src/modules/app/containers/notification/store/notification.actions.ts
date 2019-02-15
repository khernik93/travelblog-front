import { Action } from '@ngrx/store';

export enum NotificationActionTypes {
  SetError = '[Notification] Set error',
  SetSuccess = '[Notification] Set success'
}

export class SetError implements Action {
  readonly type = NotificationActionTypes.SetError;

  constructor(public message: string) { }
}

export class SetSuccess implements Action {
  readonly type = NotificationActionTypes.SetSuccess;

  constructor(public message: string) { }
}

export type NotificationActions = SetError
  | SetSuccess;
