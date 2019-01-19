import { createSelector } from '@ngrx/store';

import { selectContent, ContentState } from '../../content.reducers';

export const selectPost = createSelector(
  selectContent,
  (state: ContentState) => state.singlePost.post
);
