import * as assert from 'assert';
import * as menuActions from '../../../../../src/modules/header/components/menu/menu.actions';
import { menuReducer, initialState } from '../../../../../src/modules/header/components/menu/menu.reducer';

describe('MenuReducer', () => {

  it('should select tab', () => {
    const action = new menuActions.SelectTab('sample tab');
    const result = menuReducer(initialState, action);
    assert.deepEqual(result, {
      ...initialState,
      selectedTab: 'sample tab'
    });
  });

  it('should get tabs', () => {
    const action = new menuActions.SetTabs(['tab1', 'tab2']);
    const result = menuReducer(initialState, action);
    assert.deepEqual(result, {
      ...initialState,
      tabs: ['tab1', 'tab2'],
      selectedTab: 'tab1'
    });
  });

  it('should get tabs - edge cases', () => {
    const action = new menuActions.SetTabs([]);
    const result = menuReducer(initialState, action);
    assert.deepEqual(result, {
      ...initialState,
      tabs: [],
      selectedTab: initialState.selectedTab
    });
  });

});
