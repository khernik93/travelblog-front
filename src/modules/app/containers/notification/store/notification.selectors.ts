import { createSelector } from '@ngrx/store';

import { AppState } from '../../../store/app.reducers';
import { selectApp } from '../../../store/app.selectors';

export const selectNotification = createSelector(
  selectApp,
  (state: AppState) => state.notification.notification
);
