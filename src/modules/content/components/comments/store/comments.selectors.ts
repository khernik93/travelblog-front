import { createSelector } from '@ngrx/store';

import { ContentState } from '../../../store/content.reducers';
import { selectContent } from '../../../store/content.selectors';

export const selectComments = createSelector(
  selectContent,
  (state: ContentState) => state.comments.comments
);
