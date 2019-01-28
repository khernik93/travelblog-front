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

export const selectCanScroll = createSelector(
  selectContent,
  (state: ContentState) => {
    const meta = state.postsList.meta;
    return meta.total > meta.end + 1;
  }
);
