import * as menuActions from '../../../../../src/modules/header/components/menu/menu.actions';
import { menuReducer, initialState } from '../../../../../src/modules/header/components/menu/menu.reducer';
import TabsResponse from '../../../../utils/responses/tabs';

describe('MenuReducer', () => {

  it(`
    WHEN SelectTab action is dispatched
    THEN the selected tab is stored in the store
  `, () => {
    const tab = 'sample tab';
    const action = new menuActions.SelectTab(tab);
    const result = menuReducer(initialState, action);
    expect(result).toEqual({
      ...initialState,
      selectedTab: tab
    });
  });

  it(`
  WHEN SetTabs action is dispatched
  THEN the tabs are stored in the store
  AND the first one of them is selected
`, () => {  
    const action = new menuActions.SetTabs(TabsResponse);
    const result = menuReducer(initialState, action);
    expect(result).toEqual({
      ...initialState,
      tabs: TabsResponse,
      selectedTab: TabsResponse[0]
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
      tabs: [],
      selectedTab: initialState.selectedTab
    });
  });

});
