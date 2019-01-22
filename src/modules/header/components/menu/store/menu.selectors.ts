import { createSelector } from '@ngrx/store';

import { HeaderState } from '../../../store/header.reducers';
import { selectHeader } from '../../../store/header.selectors';

export const selectTabs = createSelector(
  selectHeader, 
  (state: HeaderState) => state.menu.tabs
);

export const selectSelectedTab = createSelector(
  selectHeader, 
  (state: HeaderState) => state.menu.selectedTab
);
