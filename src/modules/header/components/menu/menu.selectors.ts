import { createSelector } from '@ngrx/store';

import { HeaderState, selectHeader } from '../../header.reducers';

export const selectTabs = createSelector(
  selectHeader, 
  (state: HeaderState) => state.menu.tabs
);

export const selectSelectedTab = createSelector(
  selectHeader, 
  (state: HeaderState) => state.menu.selectedTab
);
