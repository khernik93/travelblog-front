import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';

import { HeaderState } from '../../../../../src/modules/header/store/header.reducers';
import { SharedStubs } from '../../../../utils/stubs/sharedStubs';
import { MockStore } from '../../../../utils/mocks/mockStore';
import { MODULE_IMPORTS, MODULE_DECLARATIONS } from '../../../../../src/modules/admin/admin.module';
import { AdminHeaderContainer } from '../../../../../src/modules/admin/containers/adminHeader/adminHeader.container';
import { SignOut } from '../../../../../src/modules/auth/store/auth.actions';

describe('AdminHeaderContainer', () => {

  let store: MockStore<HeaderState>;

  let component: AdminHeaderContainer;
  let fixture: ComponentFixture<AdminHeaderContainer>;

  beforeEach(() => {
    store = SharedStubs.getMockStoreStub<HeaderState>();

    TestBed.configureTestingModule({
      imports: [ ...MODULE_IMPORTS, RouterTestingModule ],
      declarations: MODULE_DECLARATIONS,
      providers: [
        { provide: Store, useValue: store }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminHeaderContainer);
    spyOn(store, 'dispatch').and.callThrough();
    component = fixture.componentInstance;
  });

  it('should check if the component is defined', () => {
    expect(component).toBeDefined();
  });

  it(`
    WHEN signOut is called
    THEN SignOut is dispatched
  `, () => {
    component.signOut();
    fixture.detectChanges();
    expect(store.dispatch).toHaveBeenCalledWith(new SignOut());
  });

});
