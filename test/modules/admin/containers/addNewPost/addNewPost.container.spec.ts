import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import cloneDeep from 'lodash-es/cloneDeep';

import { HeaderState } from '../../../../../src/modules/header/store/header.reducers';
import { SharedStubs } from '../../../../utils/stubs/sharedStubs';
import { MockStore } from '../../../../utils/mocks/mockStore';
import { MODULE_IMPORTS, MODULE_DECLARATIONS } from '../../../../../src/modules/admin/admin.module';
import { AddNewPostContainer } from '../../../../../src/modules/admin/containers/addNewPost/addNewPost.container';
import { GetTabs } from '../../../../../src/modules/header/containers/menu/store/menu.actions';
import { AddNewPostState } from './helpers/addNewPost.state';

describe('AddNewPostContainer', () => {

  let store: MockStore<HeaderState>;

  let component: AddNewPostContainer;
  let fixture: ComponentFixture<AddNewPostContainer>;

  beforeEach(() => {
    store = SharedStubs.getMockStoreStub<HeaderState>();

    TestBed.configureTestingModule({
      imports: MODULE_IMPORTS,
      declarations: MODULE_DECLARATIONS,
      providers: [
        { provide: Store, useValue: store }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewPostContainer);
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    store.setState(cloneDeep(AddNewPostState));
    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should check if the component is defined', () => {
    expect(component).toBeDefined();
  });

  it(`
    WHEN the component is loaded
    THEN GetTabs action is dispatched
  `, () => {
    expect(store.dispatch).toHaveBeenCalledWith(new GetTabs());
  });

});
