import { Actions } from '@ngrx/effects';
import { TestBed } from '@angular/core/testing';
import { hot, cold } from 'jasmine-marbles';

import { MenuEffects } from '../../../../../src/modules/header/components/menu/menu.effects';
import { GetTabs, SetTabs } from '../../../../../src/modules/header/components/menu/menu.actions';
import tabsResponse from '../../../../utils/responses/tabs';
import { TestActions, getActions } from '../../../../utils/mocks/testActions';
import { MenuService } from '../../../../../src/modules/header/components/menu/menu.service';
import { MenuStubs } from '../../../../utils/stubs/menuStubs';

describe('MenuEffects', () => {

  let menuService: jasmine.SpyObj<MenuService>;

  let actions: TestActions;
  let effects: MenuEffects;

  beforeEach(() => {

    menuService = MenuStubs.getMenuService();

    TestBed.configureTestingModule({
      providers: [
        MenuEffects,
        { provide: Actions, useFactory: getActions },
        { provide: MenuService, useValue: menuService }
      ]
    });

    actions = TestBed.get(Actions);
    effects = TestBed.get(MenuEffects);

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
    const outcome = new SetTabs(tabsResponse);
    actions.stream = hot('-a', {a: action});
    const response = cold('-a|', { a: tabsResponse });
    const expected = cold('--b', { b: outcome });
    menuService.getTabs.and.returnValue(response);
    expect(effects.getTabs$).toBeObservable(expected);
  });

});
