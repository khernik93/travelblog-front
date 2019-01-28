import { Actions } from '@ngrx/effects';
import { TestBed } from '@angular/core/testing';
import { hot, cold } from 'jasmine-marbles';
import cloneDeep from 'lodash-es/cloneDeep';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';

import { TabsResponse } from '../../../utils/responses/tabs.response';
import { TestActions, getActions } from '../../../utils/mocks/testActions';
import { PostsListResponse } from '../../../utils/responses/postsList.response';
import { 
  SetPosts, 
  GetPosts, 
  GetPostsSuccess, 
  GetPostsError, 
  GetPostsOnScroll 
} from '../../../../src/modules/content/components/postsList/store/postsList.actions';
import { PostsListEffects } from '../../../../src/modules/content/components/postsList/store/postsList.effects';
import { ApiClient } from '../../../../src/shared/clients/api.client';
import { SharedStubs } from '../../../utils/stubs/sharedStubs';
import { ContentState } from '../../../../src/modules/content/store/content.reducers';
import { PostsListStubs } from './helpers/postsList.stubs';

describe('PostsListEffects', () => {

  let apiClient: jasmine.SpyObj<ApiClient>;
  let store: jasmine.SpyObj<Store<ContentState>>;

  let actions: TestActions;
  let effects: PostsListEffects;
  let ClonedTabsResponse: typeof TabsResponse;
  let ClonedPostsListResponse: typeof PostsListResponse;

  beforeEach(() => {
    apiClient = SharedStubs.getApiClientStub();
    store = PostsListStubs.getStoreStub();

    TestBed.configureTestingModule({
      providers: [
        PostsListEffects,
        { provide: Actions, useFactory: getActions },
        { provide: ApiClient, useValue: apiClient },
        { provide: Store, useValue: store }
      ]
    });

    actions = TestBed.get(Actions);
    effects = TestBed.get(PostsListEffects);
  });

  beforeEach(() => {
    ClonedPostsListResponse = cloneDeep(PostsListResponse);
    ClonedTabsResponse = cloneDeep(TabsResponse);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it(`
    WHEN GetPosts action is dispatched
    THEN apiClient.getPosts method should be executed
    AND SetPosts action and success action are both dispatched
  `, () => {
    const selectedTab = ClonedTabsResponse[0];
    const action = new GetPosts(selectedTab);
    const outcome = [
      new SetPosts(ClonedPostsListResponse.content, ClonedPostsListResponse.meta),
      new GetPostsSuccess()
    ];
    actions.stream = hot('-a', {a: action});
    const response = cold('-a-|', { a: { data: ClonedPostsListResponse }});
    const expected = cold('--(bc)', { b: outcome[0], c: outcome[1] });
    apiClient.getPosts.and.returnValue(response);
    expect(effects.getPosts$).toBeObservable(expected);
  });

  it(`
    WHEN GetPosts action is dispatched
    AND there is an error
    THEN error action is dispatched
  `, () => {
    const action = new GetPosts('tab');
    const outcome = new GetPostsError();
    actions.stream = hot('-a', {a: action});
    const clientErrorResponse = cold('-#|', {}, 'error');
    const expected = cold('--(b|)', { b: outcome });
    apiClient.getPosts.and.returnValue(clientErrorResponse);
    expect(effects.getPosts$).toBeObservable(expected);
  });

  it(`
    WHEN GetPostsOnScroll action is dispatched
    THEN GetPosts action is dispatched
  `, (done) => {
    const tab = 'tab';
    actions.stream = of(new GetPostsOnScroll(tab));
    effects.getPostsOnScroll$
      .subscribe((result: any) => {
        expect(result).toEqual(new GetPosts(tab));
        done();
      })
  });

});
