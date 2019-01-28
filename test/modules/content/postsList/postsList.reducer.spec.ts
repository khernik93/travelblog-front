import cloneDeep from 'lodash-es/cloneDeep';

import * as postsListActions from '../../../../src/modules/content/components/postsList/store/postsList.actions';
import { postsListReducer, initialState } from '../../../../src/modules/content/components/postsList/store/postsList.reducer';
import { PostsListResponse } from '../../../utils/responses/postsList.response';

describe('PostsListReducer', () => {

  let ClonedPostsListResponse: typeof PostsListResponse;

  beforeEach(() => {
    ClonedPostsListResponse = cloneDeep(PostsListResponse);
  });

  it(`
    WHEN SetPosts action is dispatched
    THEN all posts should be stored in the store properly
  `, () => {
    const posts = ClonedPostsListResponse.content;
    const meta = { total: 5, start: 0, end: 1 };
    const action = new postsListActions.SetPosts(posts, meta);
    const result = postsListReducer(initialState, action);
    expect(result).toEqual({ ...initialState, posts: posts, meta: meta });
  });

  it(`
    WHEN GetPosts action is dispatched
    THEN loading should be set to true
  `, () => {
    Helper.testLoading(new postsListActions.GetPosts('tab'), true);
  });

  it(`
    WHEN GetPostsSuccess action is dispatched
    THEN loading should be set to false
  `, () => {
    Helper.testLoading(new postsListActions.GetPostsSuccess(), false);
  });

  it(`
    WHEN GetPostsOnScroll action is dispatched
    THEN loading should be set to true
  `, () => {
    Helper.testLoading(new postsListActions.GetPostsOnScroll('tab'), true);
  });

  class Helper {

    static testLoading(action: any, loading: boolean): void {
      const result = postsListReducer(initialState, action);
      expect(result).toEqual({ ...initialState, loading: loading });
    }

  }

});
