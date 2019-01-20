import { routerReducer } from '@ngrx/router-store';
import * as fromRouter from '@ngrx/router-store';
import { Params } from '@angular/router';
import { ActionReducerMap } from '@ngrx/store';

import * as fromNotification from './components/notification/notification.reducer';

export const selectApp = (state: AppState) => state;

interface RouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
}

export interface AppState {
  router: fromRouter.RouterReducerState<RouterStateUrl>;
  notification: fromNotification.NotificationState;
}

export const syncReducers: ActionReducerMap<AppState> = {
  router: routerReducer,
  notification: fromNotification.notificationReducer
};
