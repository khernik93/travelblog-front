import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import cloneDeep from 'lodash-es/cloneDeep';

import { MODULE_DECLARATIONS, MODULE_IMPORTS } from '../../../../../src/modules/app/app.module';
import { SharedStubs } from '../../../../utils/stubs/sharedStubs';
import { MockStore } from '../../../../utils/mocks/mockStore';
import { AppState } from '../../../../../src/modules/app/store/app.reducers';
import { AppStubs } from '../../../../utils/stubs/app.stubs';
import { SelectTabById } from '../../../../../src/modules/header/containers/menu/store/menu.actions';
import { LayoutContainer } from '../../../../../src/modules/app/containers/layout/layout.container';
import { LayoutComponent } from '../../../../../src/modules/app/components/layout/layout.component';
import { State } from '../../../../utils/state/state';

describe('LayoutContainer', () => {

  let store: MockStore<AppState>;
  let activatedRoute: jasmine.SpyObj<ActivatedRoute>;
  
  let component: LayoutContainer;
  let fixture: ComponentFixture<LayoutContainer>;

  beforeEach(() => {
    store = SharedStubs.getMockStoreStub<AppState>();
    activatedRoute = AppStubs.activatedRoute();

    TestBed.configureTestingModule({
      imports: [...MODULE_IMPORTS, RouterTestingModule],
      declarations: [...MODULE_DECLARATIONS, LayoutContainer, LayoutComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: Store, useValue: store },
        { provide: ActivatedRoute, useValue: activatedRoute }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutContainer);
    component = fixture.componentInstance;
    spyOn(store, 'dispatch').and.callThrough();
    store.setState(cloneDeep(State));
    fixture.detectChanges();
  });

  it('should check if the component is defined', () => {
    expect(component).toBeDefined();
  });

  it(`
    WHEN component is loaded
    THEN SelectTabById is dispatched with selectedTab
  `, () => {
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(new SelectTabById(AppStubs.selectedTab.id));
  });

});
