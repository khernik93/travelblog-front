import { Action } from '@ngrx/store';

import { Notification } from './notification.model';

export enum NotificationActionTypes {
  SetError = '[Notification] Set error',
  SetSuccess = '[Notification] Set success'
}

export class SetError implements Action {
  readonly type = NotificationActionTypes.SetError;

  constructor(public notification: Notification) { }
}

export class SetSuccess implements Action {
  readonly type = NotificationActionTypes.SetSuccess;

  constructor(public notification: Notification) { }
}

export type NotificationActions = SetError
  | SetSuccess;
