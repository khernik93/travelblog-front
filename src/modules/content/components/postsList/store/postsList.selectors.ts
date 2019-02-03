import { createSelector } from '@ngrx/store';

import { ContentState } from '../../../store/content.reducers';
import { selectContent } from '../../../store/content.selectors';
import { Meta, Post } from '../../../../../shared/clients/api.model';

export const selectPosts = createSelector(
  selectContent,
  (state: ContentState) => state.postsList.posts
);

export const selectLoading = createSelector(
  selectContent,
  (state: ContentState) => state.postsList.loading
);

export const selectMeta = createSelector(
  selectContent,
  (state: ContentState) => state.postsList.meta
);

export const selectCanScroll = createSelector(
  selectPosts,
  selectMeta,
  (posts: Post[], meta: Meta) => meta.total > posts.length
);
