import { Actions } from '@ngrx/effects';
import { TestBed } from '@angular/core/testing';
import { hot, cold } from 'jasmine-marbles';

import { TestActions, getActions } from '../../../utils/mocks/testActions';
import { RecentPostsStubs } from './helpers/recentPosts.stubs';
import recentPostsResponse from '../../../utils/responses/recentPosts.response';
import { SetRecentPosts, GetRecentPosts } from '../../../../src/modules/content/components/recentPosts/recentPosts.actions';
import { RecentPostsService } from '../../../../src/modules/content/components/recentPosts/recentPosts.service';
import { RecentPostsEffects } from '../../../../src/modules/content/components/recentPosts/recentPosts.effects';

describe('RecentPostsEffects', () => {

  let recentPostsService: jasmine.SpyObj<RecentPostsService>;

  let actions: TestActions;
  let effects: RecentPostsEffects;

  beforeEach(() => {

    recentPostsService = RecentPostsStubs.getRecentPostsService();

    TestBed.configureTestingModule({
      providers: [
        RecentPostsEffects,
        { provide: Actions, useFactory: getActions },
        { provide: RecentPostsService, useValue: recentPostsService }
      ]
    });

    actions = TestBed.get(Actions);
    effects = TestBed.get(RecentPostsEffects);

  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it(`
    WHEN GetRecentPosts action is dispatched
    THEN recentPostsSerivce.getRecentPosts method should be executed
    AND SetRecentPosts action should be dispatched with fetched recent posts
  `, () => {
    const action = new GetRecentPosts();
    const outcome = new SetRecentPosts(recentPostsResponse);
    actions.stream = hot('-a', {a: action});
    const response = cold('-a|', { a: recentPostsResponse });
    const expected = cold('--b', { b: outcome });
    recentPostsService.getRecentPosts.and.returnValue(response);
    expect(effects.getRecentPosts$).toBeObservable(expected);
  });

});
