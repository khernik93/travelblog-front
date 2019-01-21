import { createSelector } from '@ngrx/store';

import { AppState, selectApp } from '../../app.reducers';

export const selectNotifications = createSelector(
  selectApp,
  (state: AppState) => state.notification.notifications
);
