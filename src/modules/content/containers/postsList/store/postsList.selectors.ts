import { createSelector } from '@ngrx/store';

import { ContentState } from '../../../store/content.reducers';
import { selectContent } from '../../../store/content.selectors';
import { MetaDTO, PostContentDTO } from '../../../../../shared/clients/backend/backend.model';

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

export const selectInitialized = createSelector(
  selectContent,
  (state: ContentState) => state.postsList.initialized
);

export const selectCanScroll = createSelector(
  selectPosts,
  selectMeta,
  (posts: PostContentDTO[], meta: MetaDTO) => (meta !== null) ? meta.total > posts.length : false
);
