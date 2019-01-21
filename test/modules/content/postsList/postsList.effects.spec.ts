import { Actions } from '@ngrx/effects';
import { TestBed } from '@angular/core/testing';
import { hot, cold } from 'jasmine-marbles';

import tabsResponse from '../../../utils/responses/tabs.response';
import { TestActions, getActions } from '../../../utils/mocks/testActions';
import { PostsListStubs } from './helpers/postsList.stubs';
import postsListResponse from '../../../utils/responses/postsList.response';
import { SetPosts, GetPosts } from '../../../../src/modules/content/components/postsList/postsList.actions';
import { PostsListService } from '../../../../src/modules/content/components/postsList/postsList.service';
import { PostsListEffects } from '../../../../src/modules/content/components/postsList/postsList.effects';

describe('PostsListEffects', () => {

  let postsListService: jasmine.SpyObj<PostsListService>;

  let actions: TestActions;
  let effects: PostsListEffects;

  beforeEach(() => {

    postsListService = PostsListStubs.getPostsListService();

    TestBed.configureTestingModule({
      providers: [
        PostsListEffects,
        { provide: Actions, useFactory: getActions },
        { provide: PostsListService, useValue: postsListService }
      ]
    });

    actions = TestBed.get(Actions);
    effects = TestBed.get(PostsListEffects);

  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it(`
    WHEN GetPosts action is dispatched
    THEN postsListSerivce.getPosts method should be executed
    AND SetPosts action should be dispatched with fetched posts
  `, () => {
    const selectedTab = tabsResponse[0];
    const action = new GetPosts(selectedTab);
    const outcome = new SetPosts(postsListResponse.content);
    actions.stream = hot('-a', {a: action});
    const response = cold('-a|', { a: postsListResponse });
    const expected = cold('--b', { b: outcome });
    postsListService.getPosts.and.returnValue(response);
    expect(effects.getPosts$).toBeObservable(expected);
  });

});
