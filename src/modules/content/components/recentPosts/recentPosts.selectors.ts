import { createSelector } from '@ngrx/store';

import { selectContent, ContentState } from '../../content.reducers';

export const selectRecentPosts = createSelector(
  selectContent,
  (state: ContentState) => state.recentPosts.recentPosts
);
