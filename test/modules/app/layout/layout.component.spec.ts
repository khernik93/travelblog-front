import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { MODULE_DECLARATIONS, MODULE_IMPORTS } from '../../../../src/modules/app/app.module';
import { SharedStubs } from '../../../utils/stubs/sharedStubs';
import { MockStore } from '../../../utils/mocks/mockStore';
import { ActivatedRoute } from '@angular/router';
import { AppState } from '../../../../src/modules/app/store/app.reducers';
import { LayoutStubs } from './helpers/layout.stubs';
import { LayoutComponent } from '../../../../src/modules/app/components/layout/layout.component';
import { SelectTabById } from '../../../../src/modules/header/containers/menu/store/menu.actions';

describe('LayoutComponent', () => {

  let store: MockStore<AppState>;
  let activatedRoute: jasmine.SpyObj<ActivatedRoute>;
  
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(() => {
    store = SharedStubs.getMockStoreStub<AppState>();
    activatedRoute = LayoutStubs.getActivatedRouteStub();

    TestBed.configureTestingModule({
      imports: [...MODULE_IMPORTS, RouterTestingModule],
      declarations: [...MODULE_DECLARATIONS, LayoutComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: Store, useValue: store },
        { provide: ActivatedRoute, useValue: activatedRoute }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    spyOn(store, 'dispatch').and.callThrough();
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
    expect(store.dispatch).toHaveBeenCalledWith(new SelectTabById(LayoutStubs.selectedTab.id));
  });

});
