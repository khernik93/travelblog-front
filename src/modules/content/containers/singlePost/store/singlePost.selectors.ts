import { createSelector } from '@ngrx/store';

import { ContentState } from '../../../store/content.reducers';
import { selectContent } from '../../../store/content.selectors';

export const selectPost = createSelector(
  selectContent,
  (state: ContentState) => state.singlePost.post
);
