import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import cloneDeep from 'lodash-es/cloneDeep';

import { MODULE_DECLARATIONS, MODULE_IMPORTS } from '../../../../src/modules/content/content.module';
import { PostsListComponent } from '../../../../src/modules/content/components/postsList/postsList.component';
import { HeaderState } from '../../../../src/modules/header/store/header.reducers';
import { SharedStubs } from '../../../utils/stubs/sharedStubs';
import { ContentState } from '../../../../src/modules/content/store/content.reducers';
import { PostsListState, INITIALLY_SELECTED_TAB } from './helpers/postsList.state';
import { GetPostsInitial } from '../../../../src/modules/content/components/postsList/store/postsList.actions';
import { PostsListResponse } from '../../../utils/responses/postsList.response';
import { MockStore } from '../../../utils/mocks/mockStore';

describe('PostsListComponent', () => {

  let store: MockStore<HeaderState | ContentState>;
  
  let component: PostsListComponent;
  let fixture: ComponentFixture<PostsListComponent>;
  let ClonedPostsListResponse: typeof PostsListResponse;

  beforeEach(() => {
    store = SharedStubs.getMockStoreStub<HeaderState | ContentState>()

    TestBed.configureTestingModule({
      imports: [...MODULE_IMPORTS, RouterTestingModule],
      declarations: MODULE_DECLARATIONS,
      providers: [
        { provide: Store, useValue: store }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsListComponent);
    component = fixture.componentInstance;
    store.setState(cloneDeep(PostsListState));
    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  beforeEach(() =>{
    ClonedPostsListResponse = cloneDeep(PostsListResponse);
  })

  it('should check if the component is defined', () => {
    expect(component).toBeDefined();
  });

  it(`
    WHEN the component is loaded
    THEN posts should be displayed
  `, () => {
    const postWraps = fixture.debugElement.queryAll(By.css('.post-wrap'));
    expect(postWraps.length).toEqual(ClonedPostsListResponse.content.length);
  });

  it(`
    WHEN there are no posts
    THEN the proper text is displayed
  `, () => {
    let ModifiedState = cloneDeep(PostsListState);
    ModifiedState.content.postsList.posts = [];
    ModifiedState.content.postsList.initialized = true;
    store.setState(ModifiedState);
    fixture.detectChanges();
    const noContent = fixture.debugElement.queryAll(By.css('.no-content'));
    expect(noContent.length).toEqual(1);
  });

  it(`
    WHEN the component is loaded
    THEN GetPostsInitial action is dispatched
  `, () => {
    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(new GetPostsInitial(INITIALLY_SELECTED_TAB));
  });

});
