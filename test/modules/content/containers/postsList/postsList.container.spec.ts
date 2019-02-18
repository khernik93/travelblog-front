import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import cloneDeep from 'lodash-es/cloneDeep';

import { MODULE_DECLARATIONS, MODULE_IMPORTS } from '../../../../../src/modules/content/content.module';
import { HeaderState } from '../../../../../src/modules/header/store/header.reducers';
import { SharedStubs } from '../../../../utils/stubs/sharedStubs';
import { ContentState } from '../../../../../src/modules/content/store/content.reducers';
import { GetPostsInitial } from '../../../../../src/modules/content/containers/postsList/store/postsList.actions';
import { MockStore } from '../../../../utils/mocks/mockStore';
import { PostsListContainer } from '../../../../../src/modules/content/containers/postsList/postsList.container';
import { State } from '../../../../utils/state/state';

describe('PostsListContainer', () => {

  let store: MockStore<HeaderState | ContentState>;
  
  let component: PostsListContainer;
  let fixture: ComponentFixture<PostsListContainer>;

  beforeEach(() => {
    store = SharedStubs.getMockStoreStub<HeaderState | ContentState>();

    TestBed.configureTestingModule({
      imports: [...MODULE_IMPORTS, RouterTestingModule],
      declarations: MODULE_DECLARATIONS,
      providers: [
        { provide: Store, useValue: store }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsListContainer);
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
    THEN GetPostsInitial action is dispatched
  `, () => {
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(new GetPostsInitial(State.header.menu.selectedTab));
  });

});
