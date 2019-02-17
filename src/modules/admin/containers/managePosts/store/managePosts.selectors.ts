import { createSelector } from '@ngrx/store';

import { AdminState } from '../../../store/admin.reducers';
import { selectAdmin } from '../../../store/admin.selectors';

export const selectAdminSelectedTabId = createSelector(
  selectAdmin,
  (state: AdminState) => state.managePosts.selectedTabId
);

export const selectAdminPosts = createSelector(
  selectAdmin,
  (state: AdminState) => state.managePosts.posts
);
