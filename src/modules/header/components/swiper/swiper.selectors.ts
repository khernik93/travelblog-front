import { createSelector } from '@ngrx/store';

import { HeaderState, selectHeader } from '../../header.reducers';

export const selectPhotos = createSelector(
  selectHeader, 
  (state: HeaderState) => state.swiper.photos
);
