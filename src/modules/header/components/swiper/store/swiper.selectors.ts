import { createSelector } from '@ngrx/store';

import { HeaderState } from '../../../store/header.reducers';
import { selectHeader } from '../../../store/header.selectors';

export const selectPhotos = createSelector(
  selectHeader, 
  (state: HeaderState) => state.swiper.photos
);
