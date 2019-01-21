import * as postsListActions from '../../../../src/modules/content/components/postsList/postsList.actions';
import { postsListReducer, initialState } from '../../../../src/modules/content/components/postsList/postsList.reducer';
import PostsListResponse from '../../../utils/responses/postsList.response';

describe('PostsListReducer', () => {

  it(`
    WHEN SetPosts action is dispatched
    THEN all posts should be stored in the store properly
  `, () => {
    const action = new postsListActions.SetPosts(PostsListResponse.content);
    const result = postsListReducer(initialState, action);
    expect(result).toEqual({
      ...initialState,
      posts: PostsListResponse.content
    });
  });

});
