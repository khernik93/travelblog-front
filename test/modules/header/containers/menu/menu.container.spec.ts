import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import cloneDeep from 'lodash-es/cloneDeep';
import { RouterTestingModule } from '@angular/router/testing';

import { MODULE_DECLARATIONS, MODULE_IMPORTS } from '../../../../../src/modules/header/header.module';
import { HeaderState } from '../../../../../src/modules/header/store/header.reducers';
import { MockStore } from '../../../../utils/mocks/mockStore';
import { SharedStubs } from '../../../../utils/stubs/sharedStubs';
import { State } from '../../../../utils/state/state';
import { GetTabs } from '../../../../../src/modules/header/containers/menu/store/menu.actions';
import { MenuContainer } from '../../../../../src/modules/header/containers/menu/menu.container';

describe('MenuContainer', () => {

  let store: MockStore<HeaderState>;

  let component: MenuContainer;
  let fixture: ComponentFixture<MenuContainer>;

  beforeEach(() => {
    store = SharedStubs.getMockStoreStub<HeaderState>();

    TestBed.configureTestingModule({
      imports: [...MODULE_IMPORTS, RouterTestingModule],
      declarations: MODULE_DECLARATIONS,
      providers: [
        { provide: Store, useValue: store }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuContainer);
    component = fixture.componentInstance;
    store.setState(cloneDeep(State));
    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should check if the component is defined', () => {
    expect(component).toBeDefined();
  });

  it(`
    WHEN the component is loaded
    THEN GetTabs is dispatched
  `, () => {
    expect(store.dispatch).toHaveBeenCalledWith(new GetTabs());
  });

});
