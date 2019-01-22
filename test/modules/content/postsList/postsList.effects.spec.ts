import { Actions } from '@ngrx/effects';
import { TestBed } from '@angular/core/testing';
import { hot, cold } from 'jasmine-marbles';
import * as _ from 'lodash';

import { TabsResponse } from '../../../utils/responses/tabs.response';
import { TestActions, getActions } from '../../../utils/mocks/testActions';
import { PostsListResponse } from '../../../utils/responses/postsList.response';
import { SetPosts, GetPosts } from '../../../../src/modules/content/components/postsList/store/postsList.actions';
import { PostsListEffects } from '../../../../src/modules/content/components/postsList/store/postsList.effects';
import { ApiClient } from '../../../../src/shared/clients/api.client';
import { SharedStubs } from '../../../utils/stubs/sharedStubs';

describe('PostsListEffects', () => {

  let apiClient: jasmine.SpyObj<ApiClient>;

  let actions: TestActions;
  let effects: PostsListEffects;
  let ClonedTabsResponse: typeof TabsResponse;
  let ClonedPostsListResponse: typeof PostsListResponse;

  beforeEach(() => {
    apiClient = SharedStubs.getApiClientStub();

    TestBed.configureTestingModule({
      providers: [
        PostsListEffects,
        { provide: Actions, useFactory: getActions },
        { provide: ApiClient, useValue: apiClient }
      ]
    });

    actions = TestBed.get(Actions);
    effects = TestBed.get(PostsListEffects);
  });

  beforeEach(() => {
    ClonedPostsListResponse = _.cloneDeep(PostsListResponse);
    ClonedTabsResponse = _.cloneDeep(TabsResponse);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it(`
    WHEN GetPosts action is dispatched
    THEN postsListSerivce.getPosts method should be executed
    AND SetPosts action should be dispatched with fetched posts
  `, () => {
    const selectedTab = ClonedTabsResponse[0];
    const action = new GetPosts(selectedTab);
    const outcome = new SetPosts(ClonedPostsListResponse.content);
    actions.stream = hot('-a', {a: action});
    const response = cold('-a|', { a: { data: ClonedPostsListResponse }});
    const expected = cold('--b', { b: outcome });
    apiClient.getPosts.and.returnValue(response);
    expect(effects.getPosts$).toBeObservable(expected);
  });

});
