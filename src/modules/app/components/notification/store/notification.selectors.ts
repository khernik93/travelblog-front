import { createSelector } from '@ngrx/store';

import { AppState } from '../../../store/app.reducers';
import { selectApp } from '../../../store/app.selectors';

export const selectNotifications = createSelector(
  selectApp,
  (state: AppState) => state.notification.notifications
);
