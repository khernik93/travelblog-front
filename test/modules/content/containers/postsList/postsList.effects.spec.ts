import { Actions } from '@ngrx/effects';
import { TestBed } from '@angular/core/testing';
import { hot, cold } from 'jasmine-marbles';
import cloneDeep from 'lodash-es/cloneDeep';
import { Store } from '@ngrx/store';

import { TabsResponse } from '../../../../utils/responses/tabs.response';
import { TestActions, getActions } from '../../../../utils/mocks/testActions';
import { PostsListResponse } from '../../../../utils/responses/postsList.response';
import { PostsListEffects } from '../../../../../src/modules/content/containers/postsList/store/postsList.effects';
import { ApiClient } from '../../../../../src/shared/clients/api/api.client';
import { SharedStubs } from '../../../../utils/stubs/sharedStubs';
import { ContentState } from '../../../../../src/modules/content/store/content.reducers';
import { PostsListService } from '../../../../../src/modules/content/containers/postsList/postsList.service';
import { MockStore } from '../../../../utils/mocks/mockStore';
import { ContentStubs } from '../../../../utils/stubs/content.stubs';
import { tab, post, postContentDTO } from '../../../../utils/data/post';

import { 
  SetPosts, 
  GetPosts, 
  GetPostsSuccess, 
  GetPostsError, 
  GetPostsOnScroll, 
  TryToGetPostsOnScroll,
  ClearPosts,
  GetPostsInitial,
  AddNewPost,
  AddNewPostSuccess,
  EditPost,
  EditPostSuccess,
  DeletePost,
  DeletePostSuccess
} from '../../../../../src/modules/content/containers/postsList/store/postsList.actions';
import { Post } from '../../../../../src/shared/clients/api/api.model';

describe('PostsListEffects', () => {

  let apiClient: jasmine.SpyObj<ApiClient>;
  let store: MockStore<ContentState>;
  let postsListService: jasmine.SpyObj<PostsListService>;

  let actions: TestActions;
  let effects: PostsListEffects;
  let ClonedTabsResponse: typeof TabsResponse;
  let ClonedPostsListResponse: typeof PostsListResponse;
  let ClonedPost: Post;

  beforeEach(() => {
    apiClient = SharedStubs.getApiClientStub();
    store = SharedStubs.getMockStoreStub<ContentState>();
    postsListService = ContentStubs.postsListService();

    TestBed.configureTestingModule({
      providers: [
        PostsListEffects,
        { provide: Actions, useFactory: getActions },
        { provide: ApiClient, useValue: apiClient },
        { provide: Store, useValue: store },
        { provide: PostsListService, useValue: postsListService }
      ]
    });

    actions = TestBed.get(Actions);
    effects = TestBed.get(PostsListEffects);
  });

  beforeEach(() => {
    ClonedPostsListResponse = cloneDeep(PostsListResponse);
    ClonedTabsResponse = cloneDeep(TabsResponse);
    ClonedPost = cloneDeep(post);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it(`
    WHEN GetPostsInitial action is dispatched
    THEN ClearPosts, and GetPosts are dispatched with initial values
  `, () => {
    const selectedTab = ClonedTabsResponse[2];
    const action = new GetPostsInitial(selectedTab);
    const outcome = [
      new ClearPosts(),
      new GetPosts(selectedTab, postsListService.DEFAULT_START, postsListService.DEFAULT_END)
    ];
    actions.stream = hot('-a', {a: action});
    const response = cold('-a|', { a: ClonedTabsResponse });
    const expected = cold('-(bc)', { b: outcome[0], c: outcome[1] });
    spyOn(store, 'select').and.returnValue(response);
    apiClient.getPosts.and.returnValue(response);
    expect(effects.getPostsInitial$).toBeObservable(expected);
  });

  it(`
    WHEN TryToGetPostsOnScroll action is dispatched
    AND selectCanScroll returns true
    THEN GetPostsOnScroll action is dispatched
  `, () => {
    const selectedTab = ClonedTabsResponse[0];
    const action = new TryToGetPostsOnScroll(selectedTab);
    const outcome = new GetPostsOnScroll(selectedTab);
    actions.stream = hot('-a', {a: action});
    const response = cold('-a|', { a: true });
    const expected = cold('--b', { b: outcome });
    spyOn(store, 'select').and.returnValue(response);
    expect(effects.tryToGetPostsOnScroll$).toBeObservable(expected);
  });

  it(`
    WHEN TryToGetPostsOnScroll action is dispatched
    AND selectCanScroll returns false
    THEN GetPostsOnScroll action is dispatched
  `, () => {
    const selectedTab = ClonedTabsResponse[0];
    const action = new TryToGetPostsOnScroll(selectedTab);
    const outcome = new GetPostsSuccess();
    actions.stream = hot('-a', {a: action});
    const response = cold('-a|', { a: false });
    const expected = cold('--b', { b: outcome });
    spyOn(store, 'select').and.returnValue(response);
    expect(effects.tryToGetPostsOnScroll$).toBeObservable(expected);
  });

  it(`
    WHEN GetPosts action is dispatched
    THEN apiClient.getPosts method should be executed
    AND SetPosts action and success action are both dispatched
  `, () => {
    const selectedTab = ClonedTabsResponse[0];
    const action = new GetPosts(
      selectedTab, 
      ClonedPostsListResponse.meta.start,
      ClonedPostsListResponse.meta.end
    );
    const outcome = [
      new GetPostsSuccess(),
      new SetPosts(ClonedPostsListResponse.content, ClonedPostsListResponse.meta)
    ];
    actions.stream = hot('-a', {a: action});
    const response = cold('-a-|', { a: ClonedPostsListResponse });
    const expected = cold('--(bc)', { b: outcome[0], c: outcome[1] });
    apiClient.getPosts.and.returnValue(response);
    expect(effects.getPosts$).toBeObservable(expected);
  });

  it(`
    WHEN GetPosts action is dispatched
    AND there is an error
    THEN error action is dispatched
  `, () => {
    const selectedTab = ClonedTabsResponse[0];
    const action = new GetPosts(
      selectedTab, 
      ClonedPostsListResponse.meta.start,
      ClonedPostsListResponse.meta.end
    );
    const outcome = new GetPostsError();
    actions.stream = hot('-a', {a: action});
    const errorResponse = cold('-#|', {}, 'error');
    const expected = cold('--b', { b: outcome });
    apiClient.getPosts.and.returnValue(errorResponse);
    expect(effects.getPosts$).toBeObservable(expected);
  });

  it(`
    WHEN AddNewPost action is dispatched
    THEN AddNewPostSuccess action is dispatched
  `, () => {
    const action = new AddNewPost(ClonedPost);
    const outcome = new AddNewPostSuccess();
    actions.stream = hot('-a', {a: action});
    const selectResponse = hot('-a', { a: ClonedTabsResponse } );
    const apiResponse = cold('--b|', { b: null });
    const expected = cold('---c', { c: outcome });
    spyOn(store, 'select').and.returnValue(selectResponse);
    apiClient.addNewPost.and.returnValue(apiResponse);
    expect(effects.addNewPost$).toBeObservable(expected);
  });

  it(`
    WHEN EditPost action is dispatched
    THEN EditPostSuccess action is dispatched
  `, () => {
    const action = new EditPost(ClonedPost);
    const outcome = new EditPostSuccess();
    actions.stream = hot('-a', {a: action});
    const selectResponse = hot('-a', { a: ClonedTabsResponse });
    const apiResponse = cold('--b|', { b: null });
    const expected = cold('---c', { c: outcome });
    spyOn(store, 'select').and.returnValue(selectResponse);
    apiClient.updatePost.and.returnValue(apiResponse);
    expect(effects.editPost$).toBeObservable(expected);
  });

  it(`
    WHEN DeletePost action is dispatched
    THEN DeletePostSuccess action is dispatched
  `, () => {
    const action = new DeletePost(null);
    const outcome = new DeletePostSuccess();
    actions.stream = hot('-a', {a: action});
    const apiResponse = cold('-b|', { b: null });
    const expected = cold('--c', { c: outcome });
    apiClient.deletePost.and.returnValue(apiResponse);
    expect(effects.deletePost$).toBeObservable(expected);
  });

});
