import { createSelector } from '@ngrx/store';

import { ContentState } from '../../../store/content.reducers';
import { selectContent } from '../../../store/content.selectors';

export const selectPosts = createSelector(
  selectContent,
  (state: ContentState) => state.postsList.posts
);

export const selectLoading = createSelector(
  selectContent,
  (state: ContentState) => state.postsList.loading
);
