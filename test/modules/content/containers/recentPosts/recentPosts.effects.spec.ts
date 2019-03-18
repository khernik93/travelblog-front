import { Actions } from '@ngrx/effects';
import { TestBed } from '@angular/core/testing';
import { hot, cold } from 'jasmine-marbles';
import cloneDeep from 'lodash-es/cloneDeep';

import { TestActions, getActions } from '../../../../utils/mocks/testActions';
import { RecentPostsResponse } from '../../../../utils/responses/recentPosts.response';
import { SetRecentPosts, GetRecentPosts } from '../../../../../src/modules/content/containers/recentPosts/store/recentPosts.actions';
import { RecentPostsEffects } from '../../../../../src/modules/content/containers/recentPosts/store/recentPosts.effects';
import { BackendClient } from '../../../../../src/shared/clients/backend/backend.client';
import { SharedStubs } from '../../../../utils/stubs/sharedStubs';

describe('RecentPostsEffects', () => {

  let apiClient: jasmine.SpyObj<BackendClient>;

  let actions: TestActions;
  let effects: RecentPostsEffects;
  let ClonedRecentPostsResponse: typeof RecentPostsResponse;

  beforeEach(() => {
    apiClient = SharedStubs.getBackendClientStub();

    TestBed.configureTestingModule({
      providers: [
        RecentPostsEffects,
        { provide: Actions, useFactory: getActions },
        { provide: BackendClient, useValue: apiClient }
      ]
    });

    actions = TestBed.get(Actions);
    effects = TestBed.get(RecentPostsEffects);
  });

  beforeEach(() => {
    ClonedRecentPostsResponse = cloneDeep(RecentPostsResponse);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it(`
    WHEN GetRecentPosts action is dispatched
    THEN apiClient.getRecentPosts method should be executed
    AND SetRecentPosts action should be dispatched with fetched recent posts
  `, () => {
    const action = new GetRecentPosts();
    const outcome = new SetRecentPosts(ClonedRecentPostsResponse);
    actions.stream = hot('-a', {a: action});
    const response = cold('-a|', { a: ClonedRecentPostsResponse });
    const expected = cold('--b', { b: outcome });
    apiClient.getRecentPosts.and.returnValue(response);
    expect(effects.getRecentPosts$).toBeObservable(expected);
  });

});
