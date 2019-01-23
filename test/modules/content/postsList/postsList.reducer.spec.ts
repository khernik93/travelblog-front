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
    const action = new postsListActions.SetPosts(ClonedPostsListResponse.content);
    const result = postsListReducer(initialState, action);
    expect(result).toEqual({
      ...initialState,
      posts: ClonedPostsListResponse.content
    });
  });

});
