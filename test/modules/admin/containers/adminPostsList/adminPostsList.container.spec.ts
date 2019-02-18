import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import cloneDeep from 'lodash-es/cloneDeep';

import { HeaderState } from '../../../../../src/modules/header/store/header.reducers';
import { SharedStubs } from '../../../../utils/stubs/sharedStubs';
import { MockStore } from '../../../../utils/mocks/mockStore';
import { MODULE_IMPORTS, MODULE_DECLARATIONS } from '../../../../../src/modules/admin/admin.module';
import { GetTabs } from '../../../../../src/modules/header/containers/menu/store/menu.actions';
import { State } from '../../../../utils/state/state';
import { AdminPostsListContainer } from '../../../../../src/modules/admin/containers/adminPostsList/adminPostsList.container';
import { ClearPosts, GetPosts } from '../../../../../src/modules/content/containers/postsList/store/postsList.actions';

describe('AdminPostsListContainer', () => {

  let store: MockStore<HeaderState>;

  let component: AdminPostsListContainer;
  let fixture: ComponentFixture<AdminPostsListContainer>;

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
    fixture = TestBed.createComponent(AdminPostsListContainer);
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
    THEN GetTabs action is dispatched
  `, () => {
    expect(store.dispatch).toHaveBeenCalledWith(new GetTabs());
  });

  it(`
    WHEN selectedTab changes
    THEN ClearPosts and GetPosts are dispatched
  `, () => {
    expect(store.dispatch).toHaveBeenCalledWith(new ClearPosts());
    expect(store.dispatch).toHaveBeenCalledWith(new GetPosts(State.header.menu.selectedTab, 0, 9999));
  });

});
