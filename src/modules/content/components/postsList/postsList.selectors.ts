import { createSelector } from '@ngrx/store';

import { ContentState, selectContent } from '../../content.reducers';

export const selectPosts = createSelector(
  selectContent,
  (state: ContentState) => state.postsList.posts
);
