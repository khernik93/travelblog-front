import cloneDeep from 'lodash-es/cloneDeep';

import * as menuActions from '../../../../src/modules/header/components/menu/store/menu.actions';
import { menuReducer, initialState } from '../../../../src/modules/header/components/menu/store/menu.reducer';
import { TabsResponse } from '../../../utils/responses/tabs.response';

describe('MenuReducer', () => {

  let ClonedTabsResponse: typeof TabsResponse;

  beforeEach(() => {
    ClonedTabsResponse = cloneDeep(TabsResponse);
  });

  it(`
    WHEN SelectTab action is dispatched
    THEN the selected tab is stored in the store
  `, () => {
    const tab = {id: 1, name: 'name'};
    const action = new menuActions.SelectTab(tab);
    const newInitialState = { ...initialState, tabs: ClonedTabsResponse };
    const result = menuReducer(newInitialState, action);
    expect(result).toEqual({
      ...newInitialState,
      selectedTab: tab
    });
  });

  it(`
  WHEN SetTabs action is dispatched
  THEN the tabs are stored in the store
  AND the first one of them is selected
`, () => {  
    const action = new menuActions.SetTabs(ClonedTabsResponse);
    const result = menuReducer(initialState, action);
    expect(result).toEqual({
      ...initialState,
      tabs: ClonedTabsResponse
    });
  });

  it(`
    WHEN SetTabs action is dispatched with zero tabs
    THEN zero tabs should be present in the store
    AND selected tab value in the store should be reset
  `, () => {
    const action = new menuActions.SetTabs([]);
    const result = menuReducer(initialState, action);
    expect(result).toEqual({
      ...initialState,
      tabs: []
    });
  });

});
