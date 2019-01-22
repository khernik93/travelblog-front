import { createSelector } from '@ngrx/store';

import { ContentState } from '../../../store/content.reducers';
import { selectContent } from '../../../store/content.selectors';

export const selectRecentPosts = createSelector(
  selectContent,
  (state: ContentState) => state.recentPosts.recentPosts
);
