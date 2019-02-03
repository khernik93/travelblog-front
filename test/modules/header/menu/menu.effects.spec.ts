import { Actions } from '@ngrx/effects';
import { TestBed } from '@angular/core/testing';
import { hot, cold } from 'jasmine-marbles';
import cloneDeep from 'lodash-es/cloneDeep';

import { MenuEffects } from '../../../../src/modules/header/components/menu/store/menu.effects';
import { GetTabs, SetTabs } from '../../../../src/modules/header/components/menu/store/menu.actions';
import { TabsResponse } from '../../../utils/responses/tabs.response';
import { TestActions, getActions } from '../../../utils/mocks/testActions';
import { ApiClient } from '../../../../src/shared/clients/api.client';
import { SharedStubs } from '../../../utils/stubs/sharedStubs';

describe('MenuEffects', () => {

  let apiClient: jasmine.SpyObj<ApiClient>;

  let actions: TestActions;
  let effects: MenuEffects;
  let ClonedTabsResponse: typeof TabsResponse;

  beforeEach(() => {
    apiClient = SharedStubs.getApiClientStub();

    TestBed.configureTestingModule({
      providers: [
        MenuEffects,
        { provide: Actions, useFactory: getActions },
        { provide: ApiClient, useValue: apiClient }
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
    WHEN GetTabs action is dispatched
    THEN menuSwerivce.getTabs method should be executed
    AND SetTabs action should be dispatched with fetched tabs 
  `, () => {
    const action = new GetTabs();
    const outcome = new SetTabs(ClonedTabsResponse);
    actions.stream = hot('-a', {a: action});
    const response = cold('-a|', { a: ClonedTabsResponse });
    const expected = cold('--b', { b: outcome });
    apiClient.getTabs.and.returnValue(response);
    expect(effects.getTabs$).toBeObservable(expected);
  });

});
