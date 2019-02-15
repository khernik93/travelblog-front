import { Actions } from '@ngrx/effects';
import { TestBed } from '@angular/core/testing';
import { hot, cold } from 'jasmine-marbles';
import cloneDeep from 'lodash-es/cloneDeep';
import { Store } from '@ngrx/store';

import { MenuEffects } from '../../../../../src/modules/header/containers/menu/store/menu.effects';
import { GetTabs, SetTabs, SelectTabById, SelectTab } from '../../../../../src/modules/header/containers/menu/store/menu.actions';
import { TabsResponse } from '../../../../utils/responses/tabs.response';
import { TestActions, getActions } from '../../../../utils/mocks/testActions';
import { ApiClient } from '../../../../../src/shared/clients/api/api.client';
import { SharedStubs } from '../../../../utils/stubs/sharedStubs';
import { MockStore } from '../../../../utils/mocks/mockStore';
import { HeaderState } from '../../../../../src/modules/header/store/header.reducers';

describe('MenuEffects', () => {

  let apiClient: jasmine.SpyObj<ApiClient>;
  let store: MockStore<HeaderState>;

  let actions: TestActions;
  let effects: MenuEffects;
  let ClonedTabsResponse: typeof TabsResponse;

  beforeEach(() => {
    apiClient = SharedStubs.getApiClientStub();
    store = SharedStubs.getMockStoreStub<HeaderState>();

    TestBed.configureTestingModule({
      providers: [
        MenuEffects,
        { provide: Actions, useFactory: getActions },
        { provide: ApiClient, useValue: apiClient },
        { provide: Store, useValue: store }
      ]
    });

    actions = TestBed.get(Actions);
    effects = TestBed.get(MenuEffects);
  });

  beforeEach(() => {
    ClonedTabsResponse = cloneDeep(TabsResponse);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it(`
    WHEN SelectTabById action is dispatched
    THEN SelectTab is dispatched (selected based on provided ID)
  `, () => {
    const tab = ClonedTabsResponse[1];
    const action = new SelectTabById(tab.id);
    const outcome = new SelectTab(tab);
    actions.stream = hot('-a', {a: action});
    const response = hot('-a|', { a: ClonedTabsResponse });
    const expected = hot('-(b)', { b: outcome });
    spyOn(store, 'select').and.callThrough();
    store.select.and.returnValue(response);
    expect(effects.selectTabById$).toBeObservable(expected);
  });

  it(`
    WHEN GetTabs action is dispatched
    THEN SetTabs is dispatched
  `, () => {
    const action = new GetTabs();
    const outcome = new SetTabs(ClonedTabsResponse);
    actions.stream = hot('-a', {a: action});
    const response = cold('-a|', { a: ClonedTabsResponse });
    const expected = cold('--(b)', { b: outcome });
    apiClient.getTabs.and.returnValue(response);
    expect(effects.getTabs$).toBeObservable(expected);
  });

});
